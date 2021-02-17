using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Turmenic.DataAccess.EntityFrameworkCore.Repository
{
    public partial class RepositoryBase<TEntity, TId>
    {
        #region Public Virtual Methods GetSingleWithId

        public TEntity GetSingleWithId(TId id)
        {
            TEntity entity = this.GetQueryableWithId(id).SingleOrDefault();
            return entity;
        }

        public async Task<TEntity> GetSingleWithIdAsync(TId id)
        {
            TEntity entity = await this.GetQueryableWithId(id).SingleOrDefaultAsync();
            return entity;
        }

        #endregion Public Virtual Methods GetSingleWithId

        #region Public Virtual Methods GetListWithIds

        public List<TEntity> GetListWithIds(IEnumerable<TId> ids)
        {
            List<TEntity> entityList = this.GetQueryableWithIdsColl(ids).ToList();
            return entityList;
        }

        public async Task<List<TEntity>> GetListWithIdsAsync(IEnumerable<TId> ids)
        {
            List<TEntity> entityList = await this.GetQueryableWithIdsColl(ids).ToListAsync();
            return entityList;
        }

        #endregion Public Virtual Methods GetListWithIds

        #region Public Virtual Methods GetListWithQuery

        public List<TEntity> GetListWithQuery(Expression<Func<TEntity, bool>> queryExpr)
        {
            List<TEntity> entityList = this.GetQueryable(queryExpr).ToList();
            return entityList;
        }

        public async Task<List<TEntity>> GetListWithQueryAsync(Expression<Func<TEntity, bool>> queryExpr)
        {
            List<TEntity> entityList = await this.GetQueryable(queryExpr).ToListAsync();
            return entityList;
        }

        public List<TEntity> GetListWithQuery<TKey>(QueryOptions<TKey> queryOptions)
        {
            List<TEntity> entityList = this.GetQueryable(queryOptions).ToList();
            return entityList;
        }

        public async Task<List<TEntity>> GetListWithQueryAsync<TKey>(QueryOptions<TKey> queryOptions)
        {
            List<TEntity> entityList = await this.GetQueryable(queryOptions).ToListAsync();
            return entityList;
        }

        public List<TResult> GetListWithQuery<TKey, TResult>(QueryOptions<TKey, TResult> queryOptions)
        {
            List<TResult> entityList = this.GetQueryable(queryOptions).ToList();
            return entityList;
        }

        public async Task<List<TResult>> GetListWithQueryAsync<TKey, TResult>(QueryOptions<TKey, TResult> queryOptions)
        {
            List<TResult> entityList = await this.GetQueryable(queryOptions).ToListAsync();
            return entityList;
        }

        #endregion Public Virtual Methods GetListWithQuery

        #region Public Virtual Methods InsertSingle

        public TEntity InsertSingle(TEntity entity, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.DbSet.Add(entity);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entity;
        }

        public async Task<TEntity> InsertSingleAsync(TEntity entity, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.DbSet.Add(entity);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entity;
        }

        #endregion Public Virtual Methods InsertSingle

        #region Public Virtual Methods InsertAll

        public IEnumerable<TEntity> InsertAll(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.DbSet.AddRange(entities);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entities;
        }

        public async Task<IEnumerable<TEntity>> InsertAllAsync(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.DbSet.AddRange(entities);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entities;
        }

        #endregion Public Virtual Methods InsertAll

        #region Public Virtual Methods UpsertSingle

        public TEntity UpsertSingle(TEntity entity, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.AddUpsertCmd(entity);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entity;
        }

        public async Task<TEntity> UpsertSingleAsync(TEntity entity, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.AddUpsertCmd(entity);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entity;
        }

        public TEntity UpsertSingle(TEntity entity, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            entity = this.RunEntityUpsert(entity, updateDelegate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entity;
        }

        public async Task<TEntity> UpsertSingleAsync(TEntity entity, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            entity = await this.RunEntityUpsertAsync(entity, updateDelegate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entity;
        }

        public TEntity UpsertSingle(TEntity entity, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.AddUpsertCmd(entity, propNamesToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entity;
        }

        public async Task<TEntity> UpsertSingleAsync(TEntity entity, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.AddUpsertCmd(entity, propNamesToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entity;
        }

        public TEntity UpsertSingle(TEntity entity, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.AddUpsertCmd(entity, propExprsToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entity;
        }

        public async Task<TEntity> UpsertSingleAsync(TEntity entity, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdIfReq(entity);
            this.AddUpsertCmd(entity, propExprsToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entity;
        }

        #endregion Public Virtual Methods UpsertSingle

        #region Public Virtual Methods UpsertAll

        public IEnumerable<TEntity> UpsertAll(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.AddUpsertAllCmd(entities);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entities;
        }

        public async Task<IEnumerable<TEntity>> UpsertAllAsync(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.AddUpsertAllCmd(entities);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entities;
        }

        public TEntity[] UpsertAll(IEnumerable<TEntity> entities, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            TEntity[] allEntities = this.RunEntitiesUpsert(entities, updateDelegate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return allEntities;
        }

        public async Task<TEntity[]> UpsertAllAsync(IEnumerable<TEntity> entities, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            TEntity[] allEntities = await this.RunEntitiesUpsertAsync(entities, updateDelegate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return allEntities;
        }

        public TEntity[] UpsertAll(IEnumerable<TEntity> entities, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.AddUpsertAllCmd(entities, propNamesToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entities.ToArray();
        }

        public async Task<TEntity[]> UpsertAllAsync(IEnumerable<TEntity> entities, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.AddUpsertAllCmd(entities, propNamesToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entities.ToArray();
        }

        public TEntity[] UpsertAll(IEnumerable<TEntity> entities, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.AddUpsertAllCmd(entities, propExprsToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return entities.ToArray();
        }

        public async Task<TEntity[]> UpsertAllAsync(IEnumerable<TEntity> entities, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.GenerateIdsIfReq(entities);
            this.AddUpsertAllCmd(entities, propExprsToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return entities.ToArray();
        }

        #endregion Public Virtual Methods UpsertAll

        #region Public Virtual Methods UpdateSingle

        public int UpdateSingle(TEntity entity, bool saveChanges = true, bool useTransaction = true)
        {
            this.Ctx.Attach(entity).State = EntityState.Modified;

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public async Task<int> UpdateSingleAsync(TEntity entity, bool saveChanges = true, bool useTransaction = true)
        {
            this.Ctx.Attach(entity).State = EntityState.Modified;

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public TEntity UpdateSingle(TId id, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            TEntity entity = this.RunEntityUpdate(id, updateDelegate);

            if (entity != null)
            {
                int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            }

            return entity;
        }

        public async Task<TEntity> UpdateSingleAsync(TId id, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            TEntity entity = this.RunEntityUpdate(id, updateDelegate);

            if (entity != null)
            {
                int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            }

            return entity;
        }

        public int UpdateSingle(TEntity entity, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateSingleCmd(entity, propNamesToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public async Task<int> UpdateSingleAsync(TEntity entity, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateSingleCmd(entity, propNamesToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public int UpdateSingle(TEntity entity, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateSingleCmd(entity, propExprsToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public async Task<int> UpdateSingleAsync(TEntity entity, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateSingleCmd(entity, propExprsToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        #endregion Public Virtual Methods UpdateSingle

        #region Public Virtual Methods UpdateAll

        public int UpdateAll(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateAllCmd(entities);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public async Task<int> UpdateAllAsync(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateAllCmd(entities);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public TEntity[] UpdateAll(IEnumerable<TId> ids, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            TEntity[] dbEntities = this.RunEntitiesUpdate(ids, updateDelegate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return dbEntities;
        }

        public async Task<TEntity[]> UpdateAllAsync(IEnumerable<TId> ids, Action<TEntity> updateDelegate, bool saveChanges = true, bool useTransaction = true)
        {
            TEntity[] dbEntities = await this.RunEntitiesUpdateAsync(ids, updateDelegate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return dbEntities;
        }

        public int UpdateAll(IEnumerable<TEntity> entities, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateAllCmd(entities, propNamesToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public async Task<int> UpdateAllAsync(IEnumerable<TEntity> entities, string[] propNamesToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateAllCmd(entities, propNamesToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public int UpdateAll(IEnumerable<TEntity> entities, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateAllCmd(entities, propExprsToUpdate);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public async Task<int> UpdateAllAsync(IEnumerable<TEntity> entities, Expression<Func<TEntity, object>>[] propExprsToUpdate, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddUpdateAllCmd(entities, propExprsToUpdate);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        #endregion Public Virtual Methods UpdateAll

        #region Public Virtual Methods DeleteSingleWithId

        public int DeleteSingleWithId(TId id, bool saveChanges = true)
        {
            this.AddDeleteWithIdCmd(id);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, false);
            return writtenEntriesCount;
        }

        public async Task<int> DeleteSingleWithIdAsync(TId id, bool saveChanges = true)
        {
            this.AddDeleteWithIdCmd(id);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, false);
            return writtenEntriesCount;
        }

        #endregion Public Virtual Methods DeleteSingleWithId

        #region Public Virtual Methods DeleteAllWithIds

        public int DeleteAllWithIds(IEnumerable<TId> ids, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddDeleteAllWithIdsCmd(ids);

            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        public async Task<int> DeleteAllWithIdsAsync(IEnumerable<TId> ids, bool saveChanges = true, bool useTransaction = true)
        {
            this.AddDeleteAllWithIdsCmd(ids);

            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);
            return writtenEntriesCount;
        }

        #endregion Public Virtual Methods DeleteAllWithIds

        #region Public Virtual Methods DeleteAll

        protected virtual int DeleteAll(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            int writtenEntriesCount = this.DeleteAllFromQuery(entities, useTransaction, saveChanges);
            return writtenEntriesCount;
        }

        protected virtual async Task<int> DeleteAllAsync(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            int writtenEntriesCount = await this.DeleteAllFromQueryAsync(entities, useTransaction, saveChanges);
            return writtenEntriesCount;
        }

        #endregion Public Virtual Methods DeleteAll

        #region Public Virtual Methods DeleteAllWithQuery

        public int DeleteAllWithQuery(Expression<Func<TEntity, bool>> queryExpr, bool saveChanges = true, bool useTransaction = true)
        {
            IQueryable<TEntity> queryable = this.GetQueryable(queryExpr).Select(e => new TEntity { Id = e.Id });

            int writtenEntriesCount = this.DeleteAllFromQuery(queryable, useTransaction, saveChanges);
            return writtenEntriesCount;
        }

        public async Task<int> DeleteAllWithQueryAsync(Expression<Func<TEntity, bool>> queryExpr, bool saveChanges = true, bool useTransaction = true)
        {
            IQueryable<TEntity> queryable = this.GetQueryable(queryExpr).Select(e => new TEntity { Id = e.Id });

            int writtenEntriesCount = await this.DeleteAllFromQueryAsync(queryable, useTransaction, saveChanges);
            return writtenEntriesCount;
        }

        #endregion Public Virtual Methods DeleteAllWithQuery

        #region Public Virtual Methods SaveChanges

        public int SaveChanges()
        {
            int writtenEntriesCount = this.Ctx.SaveChanges();
            return writtenEntriesCount;
        }

        public async Task<int> SaveChangesAsync()
        {
            int writtenEntriesCount = await this.Ctx.SaveChangesAsync();
            return writtenEntriesCount;
        }

        #endregion Public Virtual Methods SaveChanges
    }
}
