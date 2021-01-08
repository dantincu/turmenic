using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tncvd.DataAccess.NoServer.UnitOfWork;
using VelocityDb;

namespace Tncvd.DataAccess.NoServer.Repository
{
    public class AsyncRepositoryBase<TCollectionType> : RepositoryBase<TCollectionType> where TCollectionType : IOptimizedPersistable
    {
        public AsyncRepositoryBase(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
            TaskFactory = new TaskFactory(TaskCreationOptions.LongRunning, TaskContinuationOptions.None);
        }

        protected TaskFactory TaskFactory { get; }

        public Task<TCollectionType> GetByIdAsync(ulong oid)
        {
            return TaskFactory.StartNew(() => GetById(oid));
        }

        public Task<TCollectionType> GetSingleAsync()
        {
            return TaskFactory.StartNew(() => GetSingle());
        }

        public Task<Tuple<TCollectionType, bool>> TryGetSingleAsync(bool forceSingle = false)
        {
            return TaskFactory.StartNew(() =>
            {
                TCollectionType item;
                bool isSingle = TryGetSingle(out item);
                return new Tuple<TCollectionType, bool>(item, isSingle);
            });
        }

        public Task<bool> AssureSingleAsync()
        {
            return TaskFactory.StartNew(() => AssureSingle());
        }

        public Task<List<TCollectionType>> GetAllAsync(Comparison<TCollectionType> sortDelegate = null, bool sortOrderAscending = true)
        {
            return TaskFactory.StartNew(() => GetAll(sortDelegate, sortOrderAscending));
        }

        public Task<List<TCollectionType>> GetListAsync(Func<TCollectionType, bool> predicate, Comparison<TCollectionType> sortDelegate = null, bool sortOrderAscending = true)
        {
            return TaskFactory.StartNew(() => GetList(predicate, sortDelegate, sortOrderAscending));
        }

        public Task<TCollectionType> UpdateAsync(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            return TaskFactory.StartNew(() => Update(item, propsUpdatePredicate));
        }

        public Task<TCollectionType> SaveOrUpdateAsync(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            return TaskFactory.StartNew(() => SaveOrUpdate(item, propsUpdatePredicate));
        }

        public Task<TCollectionType> SaveAsync(TCollectionType item)
        {
            return TaskFactory.StartNew(() => Save(item));
        }

        public Task<TCollectionType> SaveOrUpdateSingleAsync(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            return TaskFactory.StartNew(() => SaveOrUpdateSingle(item, propsUpdatePredicate));
        }

        public Task<IEnumerable<TCollectionType>> SaveAllAsync(IEnumerable<TCollectionType> itemColl)
        {
            return TaskFactory.StartNew(() => SaveAll(itemColl));
        }

        public Task DeleteWithIdAsync(ulong oid)
        {
            return TaskFactory.StartNew(() => DeleteWithId(oid));
        }

        public Task DeleteSingleAsync()
        {
            return TaskFactory.StartNew(() => DeleteSingle());
        }

        public Task UpdatePropsForIdAsync(ulong oid, Action<TCollectionType> updateDelegate)
        {
            return TaskFactory.StartNew(() => UpdatePropsForId(oid, updateDelegate));
        }

        public Task UpdatePropsForIdAsync<TObject>(ulong oid, TObject value, Action<TCollectionType, TObject> updateDelegate)
        {
            return TaskFactory.StartNew(() => UpdatePropsForId(oid, value, updateDelegate));
        }

        public Task UpdatePropsForIdArrAsync(ulong[] oids, Action<TCollectionType> updateDelegate)
        {
            return TaskFactory.StartNew(() => UpdatePropsForIdArr(oids, updateDelegate));
        }

        public Task UpdatePropsForIdArrAsync<TObject>(Dictionary<ulong, TObject> oidsDict, Action<TCollectionType, TObject> updateDelegate)
        {
            return TaskFactory.StartNew(() => UpdatePropsForIdArr(oidsDict, updateDelegate));
        }

        public Task DeleteAllAsync(IEnumerable<ulong> oidsColl = null)
        {
            return TaskFactory.StartNew(() => DeleteAll(oidsColl));
        }
    }
}
