using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Config;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.Config
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
