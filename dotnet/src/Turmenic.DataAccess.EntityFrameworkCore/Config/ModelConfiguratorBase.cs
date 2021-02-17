using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Turmenic.DataAccess.EntityFrameworkCore.Config
{
    public abstract class ModelConfiguratorBase
    {
        protected readonly ModelBuilder ModelBuilder;

        public ModelConfiguratorBase(ModelBuilder modelBuilder)
        {
            this.ModelBuilder = modelBuilder;
        }

        protected abstract void AddEntityConfigurators(List<EntityCfgBase> entityConfigurators);

        protected ReadOnlyCollection<EntityCfgBase> GetEntityConfigurators()
        {
            List<EntityCfgBase> entityConfiguratorsList = new List<EntityCfgBase>();
            this.AddEntityConfigurators(entityConfiguratorsList);

            ReadOnlyCollection<EntityCfgBase> entityConfigurators = new ReadOnlyCollection<EntityCfgBase>(entityConfiguratorsList);
            return entityConfigurators;
        }

        public virtual void ConfigureModel()
        {
            ReadOnlyCollection<EntityCfgBase> entityConfigurators = this.GetEntityConfigurators();

            foreach (EntityCfgBase configurator in entityConfigurators)
            {
                configurator.Configure();
            }
        }
    }
}
