﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Turmenic.DataAccess.EntityFrameworkCore.UnitOfWork;

namespace Turmenic.DataAccess.EntityFrameworkCore.Repository
{
    public class IntPkRepository<TEntity> : RepositoryBase<TEntity, int> where TEntity : EntityBase<int>, new()
    {
        public IntPkRepository(AppDbContextBase ctx) : base(ctx)
        {
        }

        #region Protected Override Methods

        protected override IQueryable<TEntity> GetQueryableWithId(int id)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => e.Id == id);
            return queryable;
        }

        protected override IQueryable<TEntity> GetQueryableWithIdsColl(IEnumerable<int> ids)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => ids.Contains(e.Id));
            return queryable;
        }

        #endregion Protected Override Methods
    }

    public class Int64PkRepository<TEntity> : RepositoryBase<TEntity, long> where TEntity : EntityBase<long>, new()
    {
        public Int64PkRepository(AppDbContextBase ctx) : base(ctx)
        {
        }

        #region Protected Override Methods

        protected override IQueryable<TEntity> GetQueryableWithId(long id)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => e.Id == id);
            return queryable;
        }

        protected override IQueryable<TEntity> GetQueryableWithIdsColl(IEnumerable<long> ids)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => ids.Contains(e.Id));
            return queryable;
        }

        #endregion Protected Override Methods
    }

    public class GuidPkRepository<TEntity> : RepositoryBase<TEntity, Guid> where TEntity : EntityBase<Guid>, new()
    {
        public GuidPkRepository(AppDbContextBase ctx) : base(ctx)
        {
        }

        #region Protected Override Methods

        protected override IQueryable<TEntity> GetQueryableWithId(Guid id)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => e.Id == id);
            return queryable;
        }

        protected override IQueryable<TEntity> GetQueryableWithIdsColl(IEnumerable<Guid> ids)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => ids.Contains(e.Id));
            return queryable;
        }

        #endregion Protected Override Methods
    }

    public class StringPkRepository<TEntity> : RepositoryBase<TEntity, string> where TEntity : EntityBase<string>, new()
    {
        public StringPkRepository(AppDbContextBase ctx) : base(ctx)
        {
        }

        #region Protected Override Methods

        protected override IQueryable<TEntity> GetQueryableWithId(string id)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => e.Id == id);
            return queryable;
        }

        protected override IQueryable<TEntity> GetQueryableWithIdsColl(IEnumerable<string> ids)
        {
            IQueryable<TEntity> queryable = this.DbSet.Where(e => ids.Contains(e.Id));
            return queryable;
        }

        #endregion Protected Override Methods
    }

    public abstract partial class RepositoryBase<TEntity, TId> : IDisposable where TEntity : EntityBase<TId>, new()
    {
        public RepositoryBase(AppDbContextBase ctx)
        {
            this.Ctx = ctx;
            this.DbSet = this.GetDbSet();
        }

        protected virtual AppDbContextBase Ctx { get; }
        protected DbSet<TEntity> DbSet { get; }

        #region IDisposable

        public void Dispose()
        {
            this.Ctx?.Dispose();
        }

        #endregion IDisposable

        #region Protected Abstract Methods

        protected abstract IQueryable<TEntity> GetQueryableWithId(TId id);
        protected abstract IQueryable<TEntity> GetQueryableWithIdsColl(IEnumerable<TId> ids);

        #endregion Protected Abstract Methods

        public class QueryOptions
        {
            public Expression<Func<TEntity, bool>> QueryExpr { get; set; }
        }

        public class QueryOptions<TKey> : QueryOptions
        {
            public Expression<Func<TEntity, TKey>> OrderByExpr { get; set; }
            public Expression<Func<TEntity, TKey>> OrderByDescExpr { get; set; }

            public PaginationOptions Pagination { get; set; }
            public FixedSizePaginationOptions FixedSizePagination { get; set; }
        }

        public class QueryOptions<TKey, TResult> : QueryOptions<TKey>
        {
            public Expression<Func<TEntity, TResult>> SelectExpr { get; set; }
        }

        public class PaginationOptions
        {
            public int SkipCount { get; set; }
            public int TakeCount { get; set; }
        }

        public class FixedSizePaginationOptions
        {
            public int PageSize { get; set; }
            public int PageIndex { get; set; }
        }

        public abstract class UpdateOptions
        {
            public UpdateOptions()
            {
                this.UseTransaction = true;
                this.SaveChanges = true;
            }

            public bool UseTransaction { get; set; }
            public bool SaveChanges { get; set; }
            public Action<TEntity> UpdateDelegate { get; set; }
            public string[] PropNamesToUpdate { get; set; }
            public Expression<Func<TEntity, object>>[] PropExprsToUpdate { get; set; }
        }

        public class UpdateSingleOptions : UpdateOptions
        {
            public TEntity Entity { get; set; }
        }

        public class UpdateAllOptions : UpdateOptions
        {
            public IEnumerable<TEntity> Entities { get; set; }
            
        }
    }
}
