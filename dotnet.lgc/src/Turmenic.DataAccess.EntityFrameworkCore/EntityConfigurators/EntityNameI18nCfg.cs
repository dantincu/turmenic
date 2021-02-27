﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Turmenic.DataAccess.EntityFrameworkCore.Config;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.EntityConfigurators
{
    public class DefaultPkEntityNameI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId, TCfgOpts>
        : DefaultPkEntityCfgBase<TEntityName, TEntityNameId, TCfgOpts>
        where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TCfgOpts : EntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public DefaultPkEntityNameI18nCfg(
            EntityTypeBuilder<TEntityName> entityTypeBuilder,
            TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected override void Configure(EntityTypeBuilder<TEntityName> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            HelperMethods.AddEntityNameI18nConfig(
                entityTypeBuilder,
                this.EntityCfgOptions);
        }
    }

    public class CustomGeneratedPkEntityNameI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId, TCfgOpts>
        : CustomGeneratedPkEntityCfgBase<TEntityName, TEntityNameId, TCfgOpts>
        where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TCfgOpts : EntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public CustomGeneratedPkEntityNameI18nCfg(
            EntityTypeBuilder<TEntityName> entityTypeBuilder,
            TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected override void Configure(EntityTypeBuilder<TEntityName> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            HelperMethods.AddEntityNameI18nConfig(
                entityTypeBuilder,
                this.EntityCfgOptions);
        }
    }

    public class DbAutoGeneratedPkEntityNameI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId, TCfgOpts>
        : DbAutoGeneratedPkEntityCfgBase<TEntityName, TEntityNameId, TCfgOpts>
        where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityNameId : struct
        where TCfgOpts : EntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public DbAutoGeneratedPkEntityNameI18nCfg(
            EntityTypeBuilder<TEntityName> entityTypeBuilder,
            TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected override void Configure(EntityTypeBuilder<TEntityName> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            HelperMethods.AddEntityNameI18nConfig(
                entityTypeBuilder,
                this.EntityCfgOptions);
        }
    }

    public class ClientAutoGeneratedPkEntityNameI18nCfg<TEntity, TEntityId, TEntityName, TEntityNameId, TCfgOpts, TValueGenerator>
        : ClientAutoGeneratedPkEntityCfgBase<TEntityName, TEntityNameId, TCfgOpts, TValueGenerator>
        where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TCfgOpts : EntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TValueGenerator : ValueGenerator
    {
        public ClientAutoGeneratedPkEntityNameI18nCfg(
            EntityTypeBuilder<TEntityName> entityTypeBuilder,
            TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected override void Configure(EntityTypeBuilder<TEntityName> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            HelperMethods.AddEntityNameI18nConfig(
                entityTypeBuilder,
                this.EntityCfgOptions);
        }
    }

    public class ClientAutoGeneratedStringPkEntityNameI18nCfg<TEntity, TEntityId, TEntityName, TCfgOpts>
        : ClientAutoGeneratedStringPkEntityCfgBase<TEntityName, TCfgOpts>
        where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, string>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, string>
        where TCfgOpts : EntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, string>
    {
        public ClientAutoGeneratedStringPkEntityNameI18nCfg(
            EntityTypeBuilder<TEntityName> entityTypeBuilder,
            TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected override void Configure(EntityTypeBuilder<TEntityName> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            HelperMethods.AddEntityNameI18nConfig(
                entityTypeBuilder,
                this.EntityCfgOptions);
        }
    }
}