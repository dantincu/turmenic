using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Turmenic.DataAccess.EntityFrameworkCore.Config
{
    public abstract class BasicI18nModelCfgBase : ModelConfiguratorBase
    {
        public BasicI18nModelCfgBase(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        protected override void AddEntityConfigurators(List<EntityCfgBase> entityConfigurators)
        {

        }
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
