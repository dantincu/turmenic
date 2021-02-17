using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.EntityConfigurators
{
    public static class HelperMethods
    {
        public static void AddEntityNameI18nConfig<TEntity, TEntityId, TEntityName, TEntityNameId>(EntityTypeBuilder<TEntityName> entityTypeBuilder)
            where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
            where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        {
            entityTypeBuilder.Property(e => e.NameI18n).IsRequired();
            entityTypeBuilder.Property(e => e.EntityId).IsRequired();
            entityTypeBuilder.Property(e => e.LangI18nId).IsRequired();

            entityTypeBuilder.HasOne(e => e.Entity).WithMany(e => e.I18nNames).HasForeignKey(e => e.EntityId);
            entityTypeBuilder.HasOne(e => e.LangI18n).WithMany().HasForeignKey(e => e.LangI18nId);
        }

        public static void AddEnumEntityNameI18nConfig<TEntity, TEntityId, TEntityName, TEntityNameId>(EntityTypeBuilder<TEntityName> entityTypeBuilder)
            where TEntity : EnumEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
            where TEntityName : EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        {
            entityTypeBuilder.Property(e => e.NameI18n).IsRequired();
            entityTypeBuilder.Property(e => e.EntityId).IsRequired();
            entityTypeBuilder.Property(e => e.LangI18nId).IsRequired();

            entityTypeBuilder.HasOne(e => e.Entity).WithMany(e => e.I18nNames).HasForeignKey(e => e.EntityId);
            entityTypeBuilder.HasOne(e => e.LangI18n).WithMany().HasForeignKey(e => e.LangI18nId);
        }
    }
}
