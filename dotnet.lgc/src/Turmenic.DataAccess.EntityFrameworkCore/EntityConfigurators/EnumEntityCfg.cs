﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using Turmenic.DataAccess.EntityFrameworkCore.Config;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.EntityConfigurators
{
    public class DefaultPkEnumEntityCfg<TEntity, TEntityId, TCfgOpts> : DefaultPkEntityCfgBase<TEntity, TEntityId, TCfgOpts>
        where TEntity : EnumEntityBase<TEntityId>
        where TCfgOpts : EnumEntityCfgOpts<TEntity, TEntityId>
    {
        public DefaultPkEnumEntityCfg(EntityTypeBuilder<TEntity> entityTypeBuilder, TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected virtual bool IsEnumNameRequired => true;
        protected virtual bool IsEnumValRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.EnumName).IsRequired(this.IsEnumNameRequired);
            entityTypeBuilder.Property(e => e.EnumVal).IsRequired(this.IsEnumValRequired);
        }
    }

    public class CustomGeneratedPkEnumEntityCfg<TEntity, TEntityId, TCfgOpts> : CustomGeneratedPkEntityCfgBase<TEntity, TEntityId, TCfgOpts>
        where TEntity : EnumEntityBase<TEntityId>
        where TCfgOpts : EnumEntityCfgOpts<TEntity, TEntityId>
    {
        public CustomGeneratedPkEnumEntityCfg(EntityTypeBuilder<TEntity> entityTypeBuilder, TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected virtual bool IsEnumNameRequired => true;
        protected virtual bool IsEnumValRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.EnumName).IsRequired(this.IsEnumNameRequired);
            entityTypeBuilder.Property(e => e.EnumVal).IsRequired(this.IsEnumValRequired);
        }
    }

    public class DbAutoGeneratedPkEnumEntityCfg<TEntity, TEntityId, TCfgOpts> : DbAutoGeneratedPkEntityCfgBase<TEntity, TEntityId, TCfgOpts>
        where TEntity : EnumEntityBase<TEntityId>
        where TEntityId : struct
        where TCfgOpts : EnumEntityCfgOpts<TEntity, TEntityId>
    {
        public DbAutoGeneratedPkEnumEntityCfg(EntityTypeBuilder<TEntity> entityTypeBuilder, TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected virtual bool IsEnumNameRequired => true;
        protected virtual bool IsEnumValRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.EnumName).IsRequired(this.IsEnumNameRequired);
            entityTypeBuilder.Property(e => e.EnumVal).IsRequired(this.IsEnumValRequired);
        }
    }

    public class ClientAutoGeneratedPkEnumEntityCfg<TEntity, TEntityId, TCfgOpts, TValueGenerator>
        : ClientAutoGeneratedPkEntityCfgBase<TEntity, TEntityId, TCfgOpts, TValueGenerator>
        where TEntity : EnumEntityBase<TEntityId>
        where TCfgOpts : EnumEntityCfgOpts<TEntity, TEntityId>
        where TValueGenerator : ValueGenerator
    {
        public ClientAutoGeneratedPkEnumEntityCfg(EntityTypeBuilder<TEntity> entityTypeBuilder, TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected virtual bool IsEnumNameRequired => true;
        protected virtual bool IsEnumValRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.EnumName).IsRequired(this.IsEnumNameRequired);
            entityTypeBuilder.Property(e => e.EnumVal).IsRequired(this.IsEnumValRequired);
        }
    }

    public class ClientAutoGeneratedStringPkEnumEntityCfg<TEntity, TCfgOpts> : ClientAutoGeneratedStringPkEntityCfgBase<TEntity, TCfgOpts>
        where TEntity : EnumEntityBase<string>
        where TCfgOpts : EnumEntityCfgOpts<TEntity, string>
    {
        public ClientAutoGeneratedStringPkEnumEntityCfg(EntityTypeBuilder<TEntity> entityTypeBuilder, TCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected virtual bool IsEnumNameRequired => true;
        protected virtual bool IsEnumValRequired => true;

        protected override void Configure(EntityTypeBuilder<TEntity> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.EnumName).IsRequired(this.IsEnumNameRequired);
            entityTypeBuilder.Property(e => e.EnumVal).IsRequired(this.IsEnumValRequired);
        }
    }
}
