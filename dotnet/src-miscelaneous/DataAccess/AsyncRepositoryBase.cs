using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VelocityDb;

namespace DataAccess
{
    public class AsyncRepositoryBase<TCollectionType> : RepositoryBase<TCollectionType> where TCollectionType : IOptimizedPersistable
    {
        public AsyncRepositoryBase(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
            this.TaskFactory = new TaskFactory(TaskCreationOptions.LongRunning, TaskContinuationOptions.None);
        }

        protected TaskFactory TaskFactory { get; }

        public Task<TCollectionType> GetByIdAsync(ulong oid)
        {
            return this.TaskFactory.StartNew(() => this.GetById(oid));
        }

        public Task<TCollectionType> GetSingleAsync()
        {
            return this.TaskFactory.StartNew(() => this.GetSingle());
        }

        public Task<Tuple<TCollectionType, bool>> TryGetSingleAsync(bool forceSingle = false)
        {
            return this.TaskFactory.StartNew(() => {
                TCollectionType item;
                bool isSingle = this.TryGetSingle(out item);
                return new Tuple<TCollectionType, bool>(item, isSingle);
            });
        }

        public Task<bool> AssureSingleAsync()
        {
            return this.TaskFactory.StartNew(() => this.AssureSingle());
        }

        public Task<List<TCollectionType>> GetAllAsync(Comparison<TCollectionType> sortDelegate = null, bool sortOrderAscending = true)
        {
            return this.TaskFactory.StartNew(() => this.GetAll(sortDelegate, sortOrderAscending));
        }

        public Task<List<TCollectionType>> GetListAsync(Func<TCollectionType, bool> predicate, Comparison<TCollectionType> sortDelegate = null, bool sortOrderAscending = true)
        {
            return this.TaskFactory.StartNew(() => this.GetList(predicate, sortDelegate, sortOrderAscending));
        }

        public Task<TCollectionType> UpdateAsync(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            return this.TaskFactory.StartNew(() => this.Update(item, propsUpdatePredicate));
        }

        public Task<TCollectionType> SaveOrUpdateAsync(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            return this.TaskFactory.StartNew(() => this.SaveOrUpdate(item, propsUpdatePredicate));
        }

        public Task<TCollectionType> SaveAsync(TCollectionType item)
        {
            return this.TaskFactory.StartNew(() => this.Save(item));
        }

        public Task<TCollectionType> SaveOrUpdateSingleAsync(TCollectionType item, Action<TCollectionType, TCollectionType> propsUpdatePredicate)
        {
            return this.TaskFactory.StartNew(() => this.SaveOrUpdateSingle(item, propsUpdatePredicate));
        }

        public Task<IEnumerable<TCollectionType>> SaveAllAsync(IEnumerable<TCollectionType> itemColl)
        {
            return this.TaskFactory.StartNew(() => this.SaveAll(itemColl));
        }

        public Task DeleteWithIdAsync(ulong oid)
        {
            return this.TaskFactory.StartNew(() => this.DeleteWithId(oid));
        }

        public Task DeleteSingleAsync()
        {
            return this.TaskFactory.StartNew(() => this.DeleteSingle());
        }

        public Task UpdatePropsForIdAsync(ulong oid, Action<TCollectionType> updateDelegate)
        {
            return this.TaskFactory.StartNew(() => this.UpdatePropsForId(oid, updateDelegate));
        }

        public Task UpdatePropsForIdAsync<TObject>(ulong oid, TObject value, Action<TCollectionType, TObject> updateDelegate)
        {
            return this.TaskFactory.StartNew(() => this.UpdatePropsForId(oid, value, updateDelegate));
        }

        public Task UpdatePropsForIdArrAsync(ulong[] oids, Action<TCollectionType> updateDelegate)
        {
            return this.TaskFactory.StartNew(() => this.UpdatePropsForIdArr(oids, updateDelegate));
        }

        public Task UpdatePropsForIdArrAsync<TObject>(Dictionary<ulong, TObject> oidsDict, Action<TCollectionType, TObject> updateDelegate)
        {
            return this.TaskFactory.StartNew(() => this.UpdatePropsForIdArr(oidsDict, updateDelegate));
        }

        public Task DeleteAllAsync(IEnumerable<ulong> oidsColl = null)
        {
            return this.TaskFactory.StartNew(() => this.DeleteAll(oidsColl));
        }
    }
}
