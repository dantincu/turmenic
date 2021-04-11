using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Turmerik.DataAccess.EntityFrameworkCore.Config;

namespace Turmerik.DriveExplorer.DataAccess.Sqlite.Config
{
    public class ModelConfigurator : ModelConfiguratorBase
    {
        public ModelConfigurator(ModelBuilder modelBuilder) : base(modelBuilder)
        {
        }

        protected override void AddEntityConfigurators(List<EntityCfgBase> entityConfigurators)
        {
        }
    }
}
