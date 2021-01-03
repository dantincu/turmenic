using System;

namespace DataAccess
{
    public abstract class UnitOfWorkBase : IDisposable
    {
        public UnitOfWorkBase(DbSession dbSession)
        {
            this.DbSession = dbSession;
        }

        protected DbSession DbSession { get; }

        protected TRepository GetRepository<TRepository, TCollectionType>(bool isReadonly = true) where TCollectionType : VelocityDb.IOptimizedPersistable where TRepository : RepositoryBase<TCollectionType>
        {
            TRepository repository = Activator.CreateInstance(typeof(TRepository), this.DbSession, isReadonly) as TRepository;
            return repository;
        }

        public virtual void Dispose()
        {
            this.DbSession.Dispose();
        }
    }
}
