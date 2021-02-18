using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.Config
{
    public class LanguageI18nCfgOpts : NamedEnumEntityI18nCfgOpts<LanguageI18n, short, LanguageI18nName, int>
    {
        public LanguageI18nCfgOpts()
        {
            this.LanguageNameI18nMaxLength = ConstantValues.DEFAULT_ENTITY_NAME_FIELD_MAX_LENGTH;
            this.LanguageCodeI18nMaxLength = 5;
        }

        public int LanguageNameI18nMaxLength { get; set; }
        public int LanguageCodeI18nMaxLength { get; set; }

    }

    public abstract class BasicI18nModelCfgBase : ModelConfiguratorBase
    {
        public BasicI18nModelCfgBase(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        protected override void AddEntityConfigurators(List<EntityCfgBase> entityConfigurators)
        {

        }
    }

    public class LanguageI18nNameCfgOpts : EnumEntityNameI18nCfgOpts<LanguageI18n, short, LanguageI18nName, int>
    {
    }

    public abstract class I18nModelCfgBase : BasicI18nModelCfgBase
    {
        public I18nModelCfgBase(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        protected override void AddEntityConfigurators(List<EntityCfgBase> entityConfigurators)
        {

        }
    }
}
