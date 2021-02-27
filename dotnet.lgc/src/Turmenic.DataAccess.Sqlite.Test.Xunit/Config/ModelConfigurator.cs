using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Config;
using Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.Config
{
    public class ModelConfigurator : ModelConfiguratorBase
    {
        public ModelConfigurator(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        protected override void AddEntityConfigurators(List<EntityCfgBase> entityConfigurators)
        {
            this.AddEntityCfg<AddressCfg, Address>(entityConfigurators);

            this.AddEntityCfg<AdministrativeAreaCfg, AdministrativeArea>(entityConfigurators);
            this.AddEntityCfg<AdministrativeAreaNameCfg, AdministrativeAreaName>(entityConfigurators);

            this.AddEntityCfg<AdministrativeRegionCfg, AdministrativeRegion>(entityConfigurators);
            this.AddEntityCfg<AdministrativeRegionNameCfg, AdministrativeRegionName>(entityConfigurators);

            this.AddEntityCfg<AdministrativeSubdivisionCfg, AdministrativeSubdivision>(entityConfigurators);
            this.AddEntityCfg<AdministrativeSubdivisionNameCfg, AdministrativeSubdivisionName>(entityConfigurators);
        }
    }
}
