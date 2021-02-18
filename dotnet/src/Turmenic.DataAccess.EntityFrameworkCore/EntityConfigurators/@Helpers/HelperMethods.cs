using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Turmenic.DataAccess.EntityFrameworkCore.Config;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.EntityConfigurators
{
    public static class HelperMethods
    {
        public static PropertyBuilder<TPropValue> SetMaxLengthIfSpec<TPropValue>(this PropertyBuilder<TPropValue> propBuilder, int maxLength)
        {
            if (maxLength > 0)
            {
                propBuilder = propBuilder.HasMaxLength(maxLength);
            }

            return propBuilder;
        }

        public static void AddNamedEntityConfig<TEntity, TEntityId>(
            EntityTypeBuilder<TEntity> entityTypeBuilder,
            NamedEntityCfgOpts<TEntity, TEntityId> namedEntityCfgOpts,
            bool isNameRequired)
            where TEntity : NamedEntityBase<TEntityId>
        {
            entityTypeBuilder.Property(e => e.Name).IsRequired(isNameRequired).SetMaxLengthIfSpec(namedEntityCfgOpts.NameMaxLength);
        }

        public static void AddNamedEnumEntityConfig<TEntity, TEntityId>(
            EntityTypeBuilder<TEntity> entityTypeBuilder,
            NamedEnumEntityCfgOpts<TEntity, TEntityId> namedEntityCfgOpts,
            bool isNameRequired)
            where TEntity : NamedEnumEntityBase<TEntityId>
        {
            entityTypeBuilder.Property(e => e.Name).IsRequired(isNameRequired).SetMaxLengthIfSpec(namedEntityCfgOpts.NameMaxLength);
        }

        public static void AddNamedEntityI18nConfig<TEntity, TEntityId, TEntityName, TEntityNameId>(
            EntityTypeBuilder<TEntity> entityTypeBuilder,
            NamedEntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> namedEntityCfgOpts,
            bool isNameRequired)
            where TEntity : NamedEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
            where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        {
            entityTypeBuilder.Property(e => e.Name).IsRequired(isNameRequired).SetMaxLengthIfSpec(namedEntityCfgOpts.NameMaxLength);
        }

        public static void AddNamedEnumEntityI18nConfig<TEntity, TEntityId, TEntityName, TEntityNameId>(
            EntityTypeBuilder<TEntity> entityTypeBuilder,
            NamedEnumEntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> namedEntityCfgOpts,
            bool isNameRequired)
            where TEntity : NamedEnumEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
            where TEntityName : EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        {
            entityTypeBuilder.Property(e => e.Name).IsRequired(isNameRequired).SetMaxLengthIfSpec(namedEntityCfgOpts.NameMaxLength);
        }

        public static void AddEntityNameI18nConfig<TEntity, TEntityId, TEntityName, TEntityNameId>(
            EntityTypeBuilder<TEntityName> entityTypeBuilder,
            EntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> entityCfgOptions)
            where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
            where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        {
            entityTypeBuilder.Property(e => e.NameI18n).IsRequired().SetMaxLengthIfSpec(entityCfgOptions.NameI18nMaxLength);
            entityTypeBuilder.Property(e => e.EntityId).IsRequired();
            entityTypeBuilder.Property(e => e.LangI18nId).IsRequired();

            entityTypeBuilder.HasOne(e => e.Entity).WithMany(e => e.I18nNames).HasForeignKey(e => e.EntityId);
            entityTypeBuilder.HasOne(e => e.LangI18n).WithMany().HasForeignKey(e => e.LangI18nId);
        }

        public static void AddEnumEntityNameI18nConfig<TEntity, TEntityId, TEntityName, TEntityNameId>(
            EntityTypeBuilder<TEntityName> entityTypeBuilder,
            EnumEntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> entityCfgOptions)
            where TEntity : EnumEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
            where TEntityName : EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        {
            entityTypeBuilder.Property(e => e.NameI18n).IsRequired().SetMaxLengthIfSpec(entityCfgOptions.NameI18nMaxLength);
            entityTypeBuilder.Property(e => e.EntityId).IsRequired();
            entityTypeBuilder.Property(e => e.LangI18nId).IsRequired();

            entityTypeBuilder.HasOne(e => e.Entity).WithMany(e => e.I18nNames).HasForeignKey(e => e.EntityId);
            entityTypeBuilder.HasOne(e => e.LangI18n).WithMany().HasForeignKey(e => e.LangI18nId);
        }
    }
}
