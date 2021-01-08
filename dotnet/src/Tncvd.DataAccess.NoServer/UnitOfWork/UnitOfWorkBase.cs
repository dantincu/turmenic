﻿using System;
using Tncvd.DataAccess.NoServer.Repository;

namespace Tncvd.DataAccess.NoServer.UnitOfWork
{
    public abstract class UnitOfWorkBase : IDisposable
    {
        public UnitOfWorkBase(DbSession dbSession)
        {
            DbSession = dbSession;
        }

        protected DbSession DbSession { get; }

        protected TRepository GetRepository<TRepository, TCollectionType>(bool isReadonly = true) where TCollectionType : VelocityDb.IOptimizedPersistable where TRepository : RepositoryBase<TCollectionType>
        {
            TRepository repository = Activator.CreateInstance(typeof(TRepository), DbSession, isReadonly) as TRepository;
            return repository;
        }

        public virtual void Dispose()
        {
            DbSession.Dispose();
        }
    }
}
