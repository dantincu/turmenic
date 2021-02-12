using System;
using System.Collections.Generic;
using System.Linq;
using Turmenic.DataAccess.VelocityDb.UnitOfWork;
using VelocityDb;
using static VelocityDb.Session.SessionBase;

namespace Turmenic.DataAccess.VelocityDb.Repository
{
    public class RepositoryBase<TCollectionType> : IDisposable where TCollectionType : IOptimizedPersistable
    {
        public RepositoryBase(DbSession dbSession, uint databaseNumber)
        {
            DbSession = dbSession ?? throw new ArgumentNullException(nameof(dbSession));
            DatabaseNumber = databaseNumber > 0 ? databaseNumber : throw new ArgumentException(nameof(databaseNumber));

            AssureDatabaseExists();
        }

        protected DbSession DbSession { get; }

        protected uint DatabaseNumber { get; }

        public TCollectionType GetById(ulong oid)
        {
            TCollectionType item = default;

            Execute(dbSession =>
            {
                item = DbSession.Session.AllObjects<TCollectionType>().SingleOrDefault(item => item.Id == oid);
            }, false);

            return item;
        }

        public TCollectionType GetSingle()
        {
            TCollectionType item = default;

            Execute(dbSession =>
            {
                item = dbSession.Session.AllObjects<TCollectionType>().SingleOrDefault();
            }, false);

            return item;
        }

        public bool TryGetSingle(out TCollectionType collectionType, bool forceSingle = false)
        {
            bool isSingle = false;
            TCollectionType item = default;

            Execute(dbSession =>
            {
                if (IsSingleCollection(dbSession))
                {
                    isSingle = true;
                    item = dbSession.Session.AllObjects<TCollectionType>().SingleOrDefault();
                }
                else if (forceSingle)
                {
                    AssureSingleCore(dbSession);
                }
            }, false);

            collectionType = item;
            return isSingle;
        }

        public bool AssureSingle()
        {
            bool isSingle = false;

            Execute(dbSession =>
            {
                AssureSingleCore(dbSession);
            });

            return isSingle;
        }

        public List<TCollectionType> GetAll(Comparison<TCollectionType> sortDelegate = null, bool sortOrderAscending = true)
        {
            List<TCollectionType> list = null;
            sortDelegate = sortDelegate ?? GetDefaultSortDelegate();

            Execute(dbSession =>
            {
                list = dbSession.Session.AllObjects<TCollectionType>().ToList();

                list.Sort(sortDelegate);
            }, false);

            return list;
        }

        public List<TCollectionType> GetList(Func<TCollectionType, bool> predicate, Comparison<TCollectionType> sortDelegate = null, bool sortOrderAscending = true)
        {
            List<TCollectionType> list = null;
            sortDelegate = sortDelegate ?? GetDefaultSortDelegate();

            Execute(dbSession =>
            {
                list = dbSession.Session.AllObjects<TCollectionType>().Where(predicate).ToList();
            }, false);

            return list;
        }

        public TCollectionType Update(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            TCollectionType existingItem = default;

            Execute(dbSession =>
            {
                TCollectionType existingItem = dbSession.Session.AllObjects<TCollectionType>().Single(obj => obj.Id == item.Id);

                propsUpdatePredicate(item, existingItem);
                dbSession.Session.UpdateObject(existingItem);
            });

            return existingItem;
        }

        public TCollectionType SaveOrUpdate(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            TCollectionType existingItem = default;

            Execute(dbSession =>
            {
                TCollectionType existingItem = dbSession.Session.AllObjects<TCollectionType>().SingleOrDefault(obj => obj.Id == item.Id);

                if (existingItem != null)
                {
                    propsUpdatePredicate(item, existingItem);
                    dbSession.Session.UpdateObject(existingItem);
                }
                else
                {
                    dbSession.Session.Persist(item);
                }
            });

            return existingItem ?? item;
        }

        public TCollectionType Save(TCollectionType item)
        {
            Execute(dbSession =>
            {
                dbSession.Session.Persist(item);
            });

            return item;
        }

        public IEnumerable<TCollectionType> SaveAll(IEnumerable<TCollectionType> itemColl)
        {
            Execute(dbSession =>
            {
                foreach (TCollectionType item in itemColl)
                {
                    dbSession.Session.Persist(item);
                }
            });

            return itemColl;
        }

        public TCollectionType SaveOrUpdateSingle(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            Execute(dbSession =>
            {
                TCollectionType existingItem = dbSession.Session.AllObjects<TCollectionType>().SingleOrDefault();

                if (existingItem != null)
                {
                    propsUpdatePredicate(item, existingItem);
                    dbSession.Session.UpdateObject(existingItem);
                }
                else
                {
                    dbSession.Session.Persist(item);
                }
            });

            return item;
        }

        public void DeleteWithId(ulong oid)
        {
            Execute(dbSession =>
            {
                dbSession.Session.DeleteObject(oid);
            });
        }

        public void UpdatePropsForId(ulong oid, Action<TCollectionType> updateDelegate)
        {
            Execute(dbSession =>
            {
                TCollectionType item = dbSession.Session.AllObjects<TCollectionType>().SingleOrDefault(item => item.Id == oid);

                if (item != null)
                {
                    updateDelegate(item);
                    dbSession.Session.UpdateObject(item);
                }
            });
        }

        public void UpdatePropsForId<TObject>(ulong oid, TObject value, Action<TCollectionType, TObject> updateDelegate)
        {
            Execute(dbSession =>
            {
                TCollectionType item = dbSession.Session.AllObjects<TCollectionType>().SingleOrDefault(item => item.Id == oid);

                if (item != null)
                {
                    updateDelegate(item, value);
                    dbSession.Session.UpdateObject(item);
                }
            });
        }

        public void UpdatePropsForIdArr(ulong[] oids, Action<TCollectionType> updateDelegate)
        {
            Execute(dbSession =>
            {
                TCollectionType[] itemArr = dbSession.Session.AllObjects<TCollectionType>().Where(item => oids.Contains(item.Id)).ToArray();

                foreach (TCollectionType item in itemArr)
                {
                    updateDelegate(item);
                    dbSession.Session.UpdateObject(item);
                }
            });
        }

        public void UpdatePropsForIdArr<TObject>(Dictionary<ulong, TObject> oidsDict, Action<TCollectionType, TObject> updateDelegate)
        {
            ulong[] oids = oidsDict.Keys.ToArray();

            Execute(dbSession =>
            {
                TCollectionType[] itemArr = dbSession.Session.AllObjects<TCollectionType>().Where(item => oids.Contains(item.Id)).ToArray();

                foreach (TCollectionType item in itemArr)
                {
                    updateDelegate(item, oidsDict[item.Id]);
                    dbSession.Session.UpdateObject(item);
                }
            });
        }

        public void DeleteAll(IEnumerable<ulong> oidsColl = null)
        {
            Execute(dbSession =>
            {
                DeleteAllCore(dbSession, oidsColl);
            });
        }

        public void DeleteSingle()
        {
            Execute(dbSession =>
            {
                TCollectionType existingItem = dbSession.Session.AllObjects<TCollectionType>().SingleOrDefault();

                if (existingItem != null)
                {
                    dbSession.Session.DeleteObject(existingItem.Id);
                }
            }, false);
        }

        public virtual void Dispose()
        {
            DbSession.Dispose();
        }

        protected void Execute(Action<DbSession> operation, bool readMode = false)
        {
            using (Transaction transaction = GetTransaction(readMode))
            {
                try
                {
                    operation.Invoke(DbSession);
                    transaction.Commit();
                }
                catch
                {
                    transaction.Rollback();

                    throw;
                }
            }
        }

        protected Transaction GetTransaction(bool readMode)
        {
            Transaction transaction;

            if (DbSession.Session.InTransaction)
            {
            }

            if (readMode)
            {
                transaction = DbSession.Session.BeginRead();
            }
            else
            {
                transaction = DbSession.Session.BeginUpdate();
            }

            return transaction;
        }

        protected virtual Comparison<TCollectionType> GetDefaultSortDelegate()
        {
            return (leftItem, rightItem) => leftItem.Id.CompareTo(rightItem.Id);
        }

        protected virtual void DeleteAllCore(DbSession dbSession, IEnumerable<ulong> oidsColl = null)
        {
            oidsColl = oidsColl ?? dbSession.Session.AllObjects<TCollectionType>().Select(item => item.Id).ToArray();

            foreach (ulong oid in oidsColl)
            {
                dbSession.Session.DeleteObject(oid);
            }
        }

        protected bool AssureSingleCore(DbSession dbSession)
        {
            bool isSingle = false;

            if (IsSingleCollection(dbSession))
            {
                isSingle = true;
            }
            else
            {
                DeleteAllCore(dbSession);
            }

            return isSingle;
        }

        protected void AssureDatabaseExists()
        {
            if (DbSession.CreateDatabaseSystem)
            {
                Execute(dbSession =>
                {
                    dbSession.Session.FlushUpdates();
                });
            }
        }

        protected bool IsSingleCollection(DbSession dbSession)
        {
            /* This doesn't work as Linq method Skip() is not safe and assumes there are at least that many elements in the collection, or it throws an exception
            return dbSession.Session.AllObjects<TCollectionType>().Skip(1).Any() == false; */

            return dbSession.Session.AllObjects<TCollectionType>().Count() <= 1;
        }
    }
}
