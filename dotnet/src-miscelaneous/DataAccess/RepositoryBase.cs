using System;
using System.Collections.Generic;
using System.Linq;
using VelocityDb;
using static VelocityDb.Session.SessionBase;

namespace DataAccess
{
    public class RepositoryBase<TCollectionType> : IDisposable where TCollectionType : IOptimizedPersistable
    {
        public RepositoryBase(DbSession dbSession, uint databaseNumber)
        {
            this.DbSession = dbSession ?? throw new ArgumentNullException(nameof(dbSession));
            this.DatabaseNumber = databaseNumber > 0 ? databaseNumber : throw new ArgumentException(nameof(databaseNumber));
        }

        protected DbSession DbSession { get; }

        protected uint DatabaseNumber { get; }

        public TCollectionType GetById(ulong oid)
        {
            TCollectionType item = default;

            this.PerformReadOperation(() =>
            {
                item = this.DbSession.Session.AllObjects<TCollectionType>().SingleOrDefault();
            });

            return item;
        }

        public List<TCollectionType> GetAll()
        {
            List<TCollectionType> list = null;

            this.PerformReadOperation(() =>
            {
                list = this.DbSession.Session.AllObjects<TCollectionType>().ToList();
            });

            return list;
        }

        public List<TCollectionType> GetList(Func<TCollectionType, bool> predicate)
        {
            List<TCollectionType> list = null;

            this.PerformReadOperation(() =>
            {
                list = this.DbSession.Session.AllObjects<TCollectionType>().Where(predicate).ToList();
            });

            return list;
        }

        public TCollectionType Save(TCollectionType item)
        {
            this.PerformWriteOperation(() =>
            {
                this.DbSession.Session.Persist(item);
            });

            return item;
        }

        public IEnumerable<TCollectionType> SaveAll(IEnumerable<TCollectionType> itemColl)
        {
            this.PerformWriteOperation(() =>
            {
                foreach (TCollectionType item in itemColl)
                {
                    this.DbSession.Session.Persist(item);
                }
            });

            return itemColl;
        }

        public void DeleteWithId(ulong oid)
        {
            this.PerformWriteOperation(() =>
            {
                this.DbSession.Session.DeleteObject(oid);
            });
        }

        public void DeleteAll(IEnumerable<ulong> oidsColl = null)
        {
            this.PerformWriteOperation(() =>
            {
                oidsColl = oidsColl ?? this.DbSession.Session.AllObjects<TCollectionType>().Select(item => item.Id).ToArray();

                foreach (ulong oid in oidsColl)
                {
                    this.DbSession.Session.DeleteObject(oid);
                }
            });
        }

        public void Dispose()
        {
            this.DbSession.Dispose();
        }

        protected void PerformReadOperation(Action operation)
        {
            Transaction transaction;
            Database database;
            bool forcedUpdate;

            if (this.DbSession.CreateDatabaseSystem)
            {
                if (this.TryOpenDatabase(out transaction, out database))
                {
                    operation.Invoke();
                    this.DbSession.CreateDatabaseSystem = false;
                }
            }
            else
            {
                if (this.TryOpenDatabaseReadonly(out transaction, out database, out forcedUpdate))
                {
                    operation.Invoke();
                }
            }
        }

        protected void PerformWriteOperation(Action operation)
        {
            Transaction transaction;
            Database database;

            if (this.TryOpenDatabase(out transaction, out database))
            {
                operation.Invoke();
                transaction.Commit();
            }
        }

        protected bool TryOpenDatabaseReadonly(out Transaction transaction, out Database database, out bool forcedUpdateMode)
        {
            transaction = null;
            database = null;
            forcedUpdateMode = false;

            bool success = false;
            
            try
            {
                transaction = this.DbSession.Session.BeginRead();
                database = this.DbSession.Session.OpenDatabase(this.DatabaseNumber);
            }
            catch (VelocityDb.Exceptions.SystemDatabaseNotFoundWithReadonlyTransactionException ex)
            {
                transaction?.Rollback();
                transaction = this.DbSession.Session.BeginUpdate();

                database = this.DbSession.Session.OpenDatabase(this.DatabaseNumber);
                forcedUpdateMode = true;
            }
            finally
            {
                if (database == null && this.DbSession.Session.InTransaction)
                {
                    transaction?.Rollback();
                    transaction?.Dispose();
                    transaction = null;
                }
                else
                {
                    success = true;
                }
            }

            return success;
        }

        protected bool TryOpenDatabase(out Transaction transaction, out Database database)
        {
            transaction = null;
            database = null;

            bool success = false;

            try
            {
                transaction = this.DbSession.Session.BeginUpdate();
                database = this.DbSession.Session.OpenDatabase(this.DatabaseNumber);
            }
            finally
            {
                if (database == null && this.DbSession.Session.InTransaction)
                {
                    this.DbSession.Session.Abort();
                    transaction?.Dispose();
                    transaction = null;
                }
                else
                {
                    success = true;
                }
            }

            return success;
        }
    }
}
