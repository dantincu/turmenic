using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.Config
{
    public abstract class EntityCfgOptionsBase
    {
    }

    public class EntityCfgOpts<TEntity, TEntityId> : EntityCfgOptionsBase where TEntity : EntityBase<TEntityId>
    {
    }

    public class NamedEntityCfgOpts<TEntity, TEntityId> : EntityCfgOpts<TEntity, TEntityId>
        where TEntity : NamedEntityBase<TEntityId>
    {
        public NamedEntityCfgOpts()
        {
            this.NameMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
        }

        public int NameMaxLength { get; set; }
    }

    public class EnumEntityCfgOpts<TEntity, TEntityId> : EntityCfgOpts<TEntity, TEntityId>
        where TEntity : EnumEntityBase<TEntityId>
    {
        public EnumEntityCfgOpts()
        {
            this.EnumNameMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
        }

        public int EnumNameMaxLength { get; set; }
    }

    public class NamedEnumEntityCfgOpts<TEntity, TEntityId> : EnumEntityCfgOpts<TEntity, TEntityId>
        where TEntity : NamedEnumEntityBase<TEntityId>
    {
        public NamedEnumEntityCfgOpts()
        {
            this.NameMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
        }

        public int NameMaxLength { get; set; }
    }

    public class EntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> : EntityCfgOpts<TEntity, TEntityId>
        where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
    }

    public class NamedEntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> : EntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntity : NamedEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public NamedEntityI18nCfgOpts()
        {
            this.NameMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
        }

        public int NameMaxLength { get; set; }
    }

    public class EnumEntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> : EnumEntityCfgOpts<TEntity, TEntityId>
        where TEntity : EnumEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
    }

    public class NamedEnumEntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> : EnumEntityI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntity : NamedEnumEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public NamedEnumEntityI18nCfgOpts()
        {
            this.NameMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
        }

        public int NameMaxLength { get; set; }
    }

    public class EntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> : EntityCfgOpts<TEntityName, TEntityNameId>
        where TEntity : EntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public EntityNameI18nCfgOpts()
        {
            this.NameI18nMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
        }

        public int NameI18nMaxLength { get; set; }
    }

    public class EnumEntityNameI18nCfgOpts<TEntity, TEntityId, TEntityName, TEntityNameId> : EntityCfgOpts<TEntityName, TEntityNameId>
        where TEntity : EnumEntityI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
        where TEntityName : EnumEntityNameI18nBase<TEntity, TEntityId, TEntityName, TEntityNameId>
    {
        public EnumEntityNameI18nCfgOpts()
        {
            this.NameI18nMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
        }

        public int NameI18nMaxLength { get; set; }
    }
}
