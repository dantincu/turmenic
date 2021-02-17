﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.EntityConfigurators
{
    public class DefaultPkNamedEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId> : DefaultPkEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntity : NamedEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public DefaultPkNamedEntityI18nCfg(EntityTypeBuilder<TEntity> entityTypeBuilder) : base(entityTypeBuilder)
        {
        }

        protected virtual bool IsNameRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.Name).IsRequired(this.IsNameRequired);
        }
    }

    public class CustomGeneratedPkNamedEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId> : CustomGeneratedPkEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntity : NamedEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public CustomGeneratedPkNamedEntityI18nCfg(EntityTypeBuilder<TEntity> entityTypeBuilder) : base(entityTypeBuilder)
        {
        }

        protected virtual bool IsNameRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.Name).IsRequired(this.IsNameRequired);
        }
    }

    public class DbAutoGeneratedPkNamedEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId> : DbAutoGeneratedPkEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntity : NamedEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityId : struct
    {
        public DbAutoGeneratedPkNamedEntityI18nCfg(EntityTypeBuilder<TEntity> entityTypeBuilder) : base(entityTypeBuilder)
        {
        }

        protected virtual bool IsNameRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.Name).IsRequired(this.IsNameRequired);
        }
    }

    public class ClientAutoGeneratedPkNamedEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId, TValueGenerator> : ClientAutoGeneratedPkEntityI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId, TValueGenerator>
        where TEntity : NamedEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TValueGenerator : ValueGenerator
    {
        public ClientAutoGeneratedPkNamedEntityI18nCfg(EntityTypeBuilder<TEntity> entityTypeBuilder) : base(entityTypeBuilder)
        {
        }

        protected virtual bool IsNameRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.Name).IsRequired(this.IsNameRequired);
        }
    }

    public class ClientAutoGeneratedStringPkNamedEntityI18nCfg<TEntity, TEntityName, TEntityNameId> : ClientAutoGeneratedStringPkEntityI18nCfg<TEntity, TEntityName, TEntityNameId>
        where TEntity : NamedEntityI18nBase<TEntity, string, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, string, TEntityName, TEntityNameId>
    {
        public ClientAutoGeneratedStringPkNamedEntityI18nCfg(EntityTypeBuilder<TEntity> entityTypeBuilder) : base(entityTypeBuilder)
        {
        }

        protected virtual bool IsNameRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.Name).IsRequired(this.IsNameRequired);
        }
    }
}
