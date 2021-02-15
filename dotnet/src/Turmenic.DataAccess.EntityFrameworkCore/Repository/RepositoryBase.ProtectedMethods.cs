using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace Turmenic.DataAccess.EntityFrameworkCore.Repository
{
    public partial class RepositoryBase<TEntity, TId>
    {
        #region Protected Virtual Methods

        protected virtual bool IsNewEntity(TEntity entity)
        {
            bool retVal = this.IsNewEntity(entity.Id);
            return retVal;
        }

        protected virtual bool IsNewEntity(TId id)
        {
            bool retVal = id?.Equals(default) ?? false;
            return retVal;
        }

        protected virtual DbSet<TEntity> GetDbSet()
        {
            PropertyInfo propInfo = Core.Reflection.HelperMethods.GetInstPropsWPubGttrSameType(this.GetType(), typeof(DbSet<TEntity>)).Single();

            DbSet<TEntity> dbSet = propInfo.GetValue(this) as DbSet<TEntity>;
            return dbSet;
        }

        protected virtual int DeleteAllFromQuery(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.DbSet.RemoveRange(entities);
            int writtenEntriesCount = this.SaveChangesIfReq(saveChanges, useTransaction);

            return writtenEntriesCount;
        }

        protected virtual async Task<int> DeleteAllFromQueryAsync(IEnumerable<TEntity> entities, bool saveChanges = true, bool useTransaction = true)
        {
            this.DbSet.RemoveRange(entities);
            int writtenEntriesCount = await this.SaveChangesIfReqAsync(saveChanges, useTransaction);

            return writtenEntriesCount;
        }

        protected virtual void AddDeleteWithIdCmd(TId id)
        {
            TEntity entity = new TEntity
            {
                Id = id
            };

            this.DbSet.Remove(entity);
        }

        protected virtual void AddDeleteAllWithIdsCmd(IEnumerable<TId> ids)
        {
            IEnumerable<TEntity> entities = ids.Select(id => new TEntity { Id = id });
            this.DbSet.RemoveRange(entities);
        }

        protected virtual void AddUpdateAllCmd(IEnumerable<TEntity> entities)
        {
            this.Ctx.AttachRange(entities);

            foreach (TEntity entity in entities)
            {
                this.Ctx.Entry(entity).State = EntityState.Modified;
            }
        }

        protected virtual void AddUpsertCmd(TEntity entity)
        {
            if (this.IsNewEntity(entity))
            {
                this.DbSet.Add(entity);
            }
            else
            {
                this.DbSet.Attach(entity).State = EntityState.Modified;
            }
        }

        protected virtual void AddUpsertAllCmd(IEnumerable<TEntity> entities)
        {
            foreach (TEntity entity in entities)
            {
                this.AddUpsertCmd(entity);
            }
        }

        protected virtual void AddUpsertCmd(TEntity entity, string[] propNamesToUpdate)
        {
            if (this.IsNewEntity(entity))
            {
                this.DbSet.Add(entity);
            }
            else
            {
                this.AddUpdateSingleCmd(entity, propNamesToUpdate);
            }
        }

        protected virtual void AddUpsertAllCmd(IEnumerable<TEntity> entities, string[] propNamesToUpdate)
        {
            foreach (TEntity entity in entities)
            {
                this.AddUpsertCmd(entity, propNamesToUpdate);
            }
        }

        protected virtual void AddUpsertCmd(TEntity entity, Expression<Func<TEntity, object>>[] propExprsToUpdate)
        {
            if (this.IsNewEntity(entity))
            {
                this.DbSet.Add(entity);
            }
            else
            {
                this.AddUpdateSingleCmd(entity, propExprsToUpdate);
            }
        }

        protected virtual void AddUpsertAllCmd(IEnumerable<TEntity> entities, Expression<Func<TEntity, object>>[] propExprsToUpdate)
        {
            foreach (TEntity entity in entities)
            {
                this.AddUpsertCmd(entity, propExprsToUpdate);
            }
        }

        protected virtual void AddUpdateSingleCmd(TEntity entity, string[] propNamesToUpdate)
        {
            EntityEntry<TEntity> entry = this.Ctx.Attach(entity);
            this.AddUpdateSingleCmd(entry, propNamesToUpdate);
        }

        protected virtual void AddUpdateSingleCmd(TEntity entity, Expression<Func<TEntity, object>>[] propExprsToUpdate)
        {
            EntityEntry<TEntity> entry = this.Ctx.Attach(entity);
            this.AddUpdateSingleCmd(entry, propExprsToUpdate);
        }

        protected virtual void AddUpdateSingleCmd(EntityEntry<TEntity> entry, string[] propNamesToUpdate)
        {
            foreach (string propName in propNamesToUpdate)
            {
                entry.Property(propName).IsModified = true;
            }
        }

        protected virtual void AddUpdateSingleCmd(EntityEntry<TEntity> entry, Expression<Func<TEntity, object>>[] propExprsToUpdate)
        {
            foreach (Expression<Func<TEntity, object>> propExpr in propExprsToUpdate)
            {
                entry.Property(propExpr).IsModified = true;
            }
        }

        protected virtual void AddUpdateAllCmd(IEnumerable<TEntity> entities, string[] propNamesToUpdate)
        {
            EntityEntry<TEntity>[] entries = entities.Select(entity => this.Ctx.Attach(entity)).ToArray();

            foreach (EntityEntry<TEntity> entry in entries)
            {
                this.AddUpdateSingleCmd(entry, propNamesToUpdate);
            }
        }

        protected virtual void AddUpdateAllCmd(IEnumerable<TEntity> entities, Expression<Func<TEntity, object>>[] propExprsToUpdate)
        {
            EntityEntry<TEntity>[] entries = entities.Select(entity => this.Ctx.Attach(entity)).ToArray();

            foreach (EntityEntry<TEntity> entry in entries)
            {
                this.AddUpdateSingleCmd(entry, propExprsToUpdate);
            }
        }

        #endregion Protected Virtual Methods

        #region Protected Methods

        protected TEntity RunEntityUpsert(TEntity entity, Action<TEntity> updateDelegate)
        {
            if (this.IsNewEntity(entity))
            {
                this.DbSet.Add(entity);
            }
            else
            {
                entity = this.RunEntityUpdate(entity.Id, updateDelegate);
            }

            return entity;
        }

        protected async Task<TEntity> RunEntityUpsertAsync(TEntity entity, Action<TEntity> updateDelegate)
        {
            if (this.IsNewEntity(entity))
            {
                this.DbSet.Add(entity);
            }
            else
            {
                entity = await this.RunEntityUpdateAsync(entity.Id, updateDelegate);
            }

            return entity;
        }

        protected TEntity[] RunEntitiesUpsert(IEnumerable<TEntity> entities, Action<TEntity> updateDelegate)
        {
            TEntity[] insertedEntities = entities.Where(e => this.IsNewEntity(e)).ToArray();
            this.DbSet.AddRange(insertedEntities);

            TEntity[] updateEntities = this.RunEntitiesUpdate(entities.Select(e => e.Id).Where(id => this.IsNewEntity(id) == false), updateDelegate);
            TEntity[] allEntities = Core.Collection.HelperMethods.ConcatArrays(insertedEntities, updateEntities);

            return allEntities;
        }

        protected async Task<TEntity[]> RunEntitiesUpsertAsync(IEnumerable<TEntity> entities, Action<TEntity> updateDelegate)
        {
            TEntity[] insertedEntities = entities.Where(e => this.IsNewEntity(e)).ToArray();
            this.DbSet.AddRange(insertedEntities);

            TEntity[] updateEntities = await this.RunEntitiesUpdateAsync(entities.Select(e => e.Id).Where(id => this.IsNewEntity(id) == false), updateDelegate);
            TEntity[] allEntities = Core.Collection.HelperMethods.ConcatArrays(insertedEntities, updateEntities);

            return allEntities;
        }

        protected TEntity RunEntityUpdate(TId id, Action<TEntity> updateDelegate)
        {
            TEntity dbEntity = this.GetQueryableWithId(id).SingleOrDefault();

            if (dbEntity != null)
            {
                updateDelegate.Invoke(dbEntity);
            }

            return dbEntity;
        }

        protected async Task<TEntity> RunEntityUpdateAsync(TId id, Action<TEntity> updateDelegate)
        {
            TEntity dbEntity = await this.GetQueryableWithId(id).SingleOrDefaultAsync();

            if (dbEntity != null)
            {
                updateDelegate.Invoke(dbEntity);
            }

            return dbEntity;
        }

        protected TEntity[] RunEntitiesUpdate(IEnumerable<TId> ids, Action<TEntity> updateDelegate)
        {
            TEntity[] dbEntities = this.GetQueryableWithIdsColl(ids).ToArray();

            foreach (TEntity dbEntity in dbEntities)
            {
                updateDelegate.Invoke(dbEntity);
            }

            return dbEntities;
        }

        protected async Task<TEntity[]> RunEntitiesUpdateAsync(IEnumerable<TId> ids, Action<TEntity> updateDelegate)
        {
            TEntity[] dbEntities = await this.GetQueryableWithIdsColl(ids).ToArrayAsync();

            foreach (TEntity dbEntity in dbEntities)
            {
                updateDelegate.Invoke(dbEntity);
            }

            return dbEntities;
        }

        protected IQueryable<TEntity> GetQueryable(Expression<Func<TEntity, bool>> queryExpr)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(queryExpr);
            return queryable;
        }

        protected IQueryable<TResult> GetQueryable<TResult>(Expression<Func<TEntity, bool>> queryExpr, Expression<Func<TEntity, TResult>> selectExpr)
        {
            IQueryable<TResult> queryable = this.DbSet.Where(queryExpr).Select(selectExpr);
            return queryable;
        }

        protected IQueryable<TEntity> GetQueryable<TKey>(QueryOptions queryOptions)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(queryOptions.QueryExpr);
            return queryable;
        }

        protected IQueryable<TEntity> GetQueryable<TKey>(QueryOptions<TKey> queryOptions)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(queryOptions.QueryExpr);

            queryable = this.ApplyOrderingIfReq(queryable, queryOptions);
            queryable = this.ApplyPaginationIfReq(queryable, queryOptions);

            return queryable;
        }

        protected IQueryable<TResult> GetQueryable<TKey, TResult>(QueryOptions<TKey, TResult> queryOptions)
        {
            IQueryable<TResult> queryable = this.GetQueryable((QueryOptions<TKey>)queryOptions).Select(queryOptions.SelectExpr);
            return queryable;
        }

        protected IQueryable<TEntity> ApplyOrderingIfReq<TKey>(IQueryable<TEntity> queryable, QueryOptions<TKey> queryOptions)
        {
            if (queryOptions.OrderByExpr != null || queryOptions.OrderByDescExpr != null)
            {
                queryable = this.GetOrderedQueryableIfReq(queryable, queryOptions);
            }

            return queryable;
        }

        protected IOrderedQueryable<TEntity> GetOrderedQueryableIfReq<TKey>(IQueryable<TEntity> queryable, QueryOptions<TKey> queryOptions)
        {
            IOrderedQueryable<TEntity> orderedQueryable = null;

            if (queryOptions.OrderByExpr != null)
            {
                orderedQueryable = queryable.OrderBy(queryOptions.OrderByExpr);
            }
            else if (queryOptions.OrderByDescExpr != null)
            {
                orderedQueryable = queryable.OrderBy(queryOptions.OrderByDescExpr);
            }

            return orderedQueryable;
        }

        protected IQueryable<TEntity> ApplyPaginationIfReq<TKey>(IQueryable<TEntity> queryable, QueryOptions<TKey> queryOptions)
        {
            queryable = this.ApplyPaginationIfReq(queryable, queryOptions.Pagination);
            queryable = this.ApplyFixedSizePaginationIfReq(queryable, queryOptions.FixedSizePagination);

            return queryable;
        }

        protected IQueryable<TEntity> ApplyPaginationIfReq(IQueryable<TEntity> queryable, PaginationOptions paginationOptions)
        {
            if (paginationOptions != null)
            {
                queryable = queryable.Skip(paginationOptions.SkipCount).Take(paginationOptions.TakeCount);
            }

            return queryable;
        }

        protected IQueryable<TEntity> ApplyFixedSizePaginationIfReq(IQueryable<TEntity> queryable, FixedSizePaginationOptions fixedSizePaginationOptions)
        {
            if (fixedSizePaginationOptions != null)
            {
                PaginationOptions paginationOptions = this.GetPaginationOptions(fixedSizePaginationOptions);
                queryable = this.ApplyPaginationIfReq(queryable, paginationOptions);
            }

            return queryable;
        }

        protected PaginationOptions GetPaginationOptions(FixedSizePaginationOptions fixedSizePaginationOptions)
        {
            PaginationOptions paginationOptions = new PaginationOptions
            {
                SkipCount = fixedSizePaginationOptions.PageSize * fixedSizePaginationOptions.PageIndex,
                TakeCount = fixedSizePaginationOptions.PageSize
            };

            return paginationOptions;
        }

        protected int SaveChangesIfReq(bool isReq, bool useTran)
        {
            int writtenEntriesCount = -1;

            if (isReq)
            {
                using IDbContextTransaction transaction = this.GetTranIfReq(useTran);
                writtenEntriesCount = this.Ctx.SaveChanges();
            }

            return writtenEntriesCount;
        }

        protected async Task<int> SaveChangesIfReqAsync(bool isReq, bool useTran)
        {
            int writtenEntriesCount = -1;

            if (isReq)
            {
                using IDbContextTransaction transaction = await this.GetTranIfReqAsync(useTran);
                writtenEntriesCount = await this.Ctx.SaveChangesAsync();
            }

            return writtenEntriesCount;
        }

        protected IDbContextTransaction GetTranIfReq(bool isReq)
        {
            IDbContextTransaction transaction = null;

            if (isReq)
            {
                transaction = this.Ctx.Database.BeginTransaction();
            }

            return transaction;
        }

        protected async Task<IDbContextTransaction> GetTranIfReqAsync(bool isReq)
        {
            IDbContextTransaction transaction = null;

            if (isReq)
            {
                transaction = await this.Ctx.Database.BeginTransactionAsync();
            }

            return transaction;
        }

        #endregion Protected Methods
    }
}
