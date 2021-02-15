using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Turmenic.DataAccess.Sqlite.UnitOfWork;

namespace Turmenic.DataAccess.EntityFrameworkCore.Repository
{
    #region Derived classes

    public class BasicRepository<TEntity> : BasicRepository<TEntity, int> where TEntity : class
    {
        public BasicRepository(AppDbContextBase ctx) : base(ctx)
        {
        }
    }

    public class BasicInt64PkRepository<TEntity> : BasicRepository<TEntity, long> where TEntity : class
    {
        public BasicInt64PkRepository(AppDbContextBase ctx) : base(ctx)
        {
        }
    }

    public class BasicGuidPkRepository<TEntity> : BasicRepository<TEntity, Guid> where TEntity : class
    {
        public BasicGuidPkRepository(AppDbContextBase ctx) : base(ctx)
        {
        }
    }

    public class BasicStringPkRepository<TEntity> : BasicRepository<TEntity, string> where TEntity : class
    {
        public BasicStringPkRepository(AppDbContextBase ctx) : base(ctx)
        {
        }
    }

    #endregion Derived classes

    public class BasicRepository<TEntity, TId> where TEntity : class
    {
        public BasicRepository(AppDbContextBase ctx)
        {
            this.Ctx = ctx;
            this.IdPropPredicate = this.GetIdPropPredicate();
            this.DbSet = this.GetDbSet();
        }

        protected virtual AppDbContextBase Ctx { get; }
        protected virtual string IdPropName => "Id";
        protected virtual Func<TEntity, TId> IdPropPredicate { get; }
        protected DbSet<TEntity> DbSet { get; }

        #region Public Methods NonAsync

        public virtual TEntity GetById(TId id)
        {
            TEntity entity = this.DbSet.Where(e => this.IdPropPredicate(e) == id).SingleOrDefault();
            return entity;
        }

        public virtual List<TRetsult> GetWhere<TRetsult>(
            Func<TEntity, bool> predicate,
            Func<TEntity, TRetsult> selector,
            Func<IEnumerable<TEntity>, IEnumerable<TEntity>> transformer = null
            )
        {
            IEnumerable<TEntity> enumerable = this.DbSet.Where(predicate);

            if (enumerable != null)
            {
                enumerable = transformer(enumerable);
            }

            IEnumerable<TRetsult> transformedEnumberable = enumerable.Select(selector);

            List<TRetsult> entities = transformedEnumberable.ToList();
            return entities;
        }

        public virtual List<TEntity> GetWhere(
            Func<TEntity, bool> predicate,
            Func<IEnumerable<TEntity>, IEnumerable<TEntity>> transformer = null
            )
        {
            IEnumerable<TEntity> enumerable = this.DbSet.Where(predicate);

            if (enumerable != null)
            {
                enumerable = transformer(enumerable);
            }

            List<TEntity> entities = enumerable.ToList();
            return entities;
        }

        public virtual TEntity Insert(TEntity entity, bool saveChanges = true)
        {
            this.DbSet.Add(entity);

            if (saveChanges)
            {
                this.Ctx.SaveChanges();
            }

            return entity;
        }

        public virtual TEntity Update(TEntity entity, Action<TEntity, TEntity> propsUpdater, bool saveChanges = true)
        {

        }

        public virtual TEntity Update(TEntity entity, string[] propNamesToUpdate, bool saveChanges = true)
        {

        }

        public virtual TEntity Update(TEntity entity, Func<TEntity, object> propExprToUpdate, bool saveChanges = true)
        {

        }

        public void SaveChanges()
        {
            this.Ctx.SaveChanges();
        }

        #endregion Public Methods NonAsync

        #region Public Methods Async

        public virtual Task<TEntity> GetByIdAsync(TId id)
        {
            Task<TEntity> task = this.DbSet.Where(this.GetIdPredicate(id)).AsQueryable().SingleOrDefaultAsync();
            return task;
        }

        protected void SaveChangesIfReq(bool isReq)
        {
            if (isReq)
            {
                this.Ctx.SaveChanges();
            }
        }

        #endregion Public Methods Async

        #region Protected Methods

        protected Task SaveChangesIfReqAsync(bool isReq)
        {
            Task task;

            if (isReq)
            {
                task = this.Ctx.SaveChangesAsync();
            }
            else
            {
                task = Task.CompletedTask;
            }

            return task;
        }

        protected virtual Func<TEntity, bool> GetIdPredicate(TId id)
        {
            Func<TEntity, bool> predicate = Core.Reflection.HelperMethods.GetPropEqPredicate<TEntity, TId>(this.IdPropName, id);
            return predicate;
        }

        protected virtual Func<TEntity, TId> GetIdPropPredicate()
        {
            Func<TEntity, TId> predicate = Core.Reflection.HelperMethods.GetPropPredicate<TEntity, TId>(this.IdPropName);
            return predicate;
        }

        protected virtual DbSet<TEntity> GetDbSet()
        {
            PropertyInfo propInfo = Core.Reflection.HelperMethods.GetInstPropsWPubGttrSameType(this.GetType(), typeof(DbSet<TEntity>)).Single();

            DbSet<TEntity> dbSet = propInfo.GetValue(this) as DbSet<TEntity>;
            return dbSet;
        }

        #endregion Protected Methods
    }
}
