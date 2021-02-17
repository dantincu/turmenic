using System.Collections.Generic;

namespace Turmenic.DataAccess.EntityFrameworkCore.Entities
{
    public class LanguageI18n : EnumEntityI18nBase<short, LanguageI18nName, int>
    {
        /// <summary>
        /// This is the language name as written in the language itself.
        /// </summary>
        public string LanguageNameI18n { get; set; }
        public string LanguageCodeI18n { get; set; }
        public bool IsDefaultLanguageI18n { get; set; }
    }

    public class LanguageI18nName : EnumEntityNameI18nBase<LanguageI18n, short, LanguageI18nName, int>
    {
        public short FromLangI18nId { get; set; }
        public LanguageI18n FromLangI18n { get; set; }
    }

    public abstract class EntityI18nBase<TEntityId, TEntityName, TEntityNameId> : EntityBase<TEntityId>
    {
        public List<TEntityName> I18nNames { get; set; }
    }

    public abstract class NamedEntityI18nBase<TEntityId, TEntityName, TEntityNameId> : EntityI18nBase<TEntityId, TEntityName, TEntityNameId>
    {
        public string Name { get; set; }
    }

    public abstract class EnumEntityI18nBase<TEntityId, TEntityName, TEntityNameId> : EnumEntityBase<TEntityId>
    {
        public List<TEntityName> I18nNames { get; set; }
    }

    public abstract class NamedEnumEntityI18nBase<TEntityId, TEntityName, TEntityNameId> : EnumEntityI18nBase<TEntityId, TEntityName, TEntityNameId>
    {
        public string Name { get; set; }
    }

    public abstract class EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId> : EntityBase<TEntityNameId>
        where TEntity : EntityI18nBase<TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public TEntityId EntityId { get; set; }
        public short LangI18nId { get; set; }
        public string NameI18n { get; set; }
        public TEntity Entity { get; set; }
        public LanguageI18n LangI18n { get; set; }
    }

    public abstract class EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId> : EnumEntityBase<TEntityNameId>
        where TEntity : EnumEntityI18nBase<TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public TEntityId EntityId { get; set; }
        public short LangI18nId { get; set; }
        public string NameI18n { get; set; }
        public TEntity Entity { get; set; }
        public LanguageI18n LangI18n { get; set; }
    }

    public enum LangI18n
    {
        /// <summary>
        /// English / English.
        /// </summary>
        EN,

        /// <summary>
        /// Română / Romanian
        /// </summary>
        RO,
    }
}
