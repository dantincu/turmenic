using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Reflection;
namespace Turmenic.DataAccess.EntityFrameworkCore.Config
{
    public abstract class ModelConfiguratorBase
    {
        protected readonly ModelBuilder ModelBuilder;

        public ModelConfiguratorBase(ModelBuilder modelBuilder)
        {
            this.ModelBuilder = modelBuilder;
        }

        public virtual void ConfigureModel()
        {
            ReadOnlyCollection<EntityCfgBase> entityConfigurators = this.GetEntityConfigurators();

            foreach (EntityCfgBase configurator in entityConfigurators)
            {
                configurator.Configure();
            }
        }

        protected abstract void AddEntityConfigurators(List<EntityCfgBase> entityConfigurators);

        protected ReadOnlyCollection<EntityCfgBase> GetEntityConfigurators()
        {
            List<EntityCfgBase> entityConfiguratorsList = new List<EntityCfgBase>();
            this.AddEntityConfigurators(entityConfiguratorsList);

            ReadOnlyCollection<EntityCfgBase> entityConfigurators = new ReadOnlyCollection<EntityCfgBase>(entityConfiguratorsList);
            return entityConfigurators;
        }

        protected virtual void AddEntityCfg<TEntityCfg, TEntity>(List<EntityCfgBase> entityConfigurators)
            where TEntityCfg : EntityCfgBase
            where TEntity : class
        {
            EntityTypeBuilder<TEntity> entityTypeBuilder = this.ModelBuilder.Entity<TEntity>();
            this.AddEntityCfg<TEntityCfg>(entityConfigurators, entityTypeBuilder);
        }

        protected virtual void AddEntityCfg<TEntityCfg>(
            List<EntityCfgBase> entityConfigurators,
            EntityTypeBuilder entityTypeBuilder)
            where TEntityCfg : EntityCfgBase
        {
            EntityCfgOptionsBase entityCfgOptions = this.GetEntityCfgOptions<TEntityCfg>(entityTypeBuilder);

            TEntityCfg entityCfg = Activator.CreateInstance(typeof(TEntityCfg), entityTypeBuilder, entityCfgOptions) as TEntityCfg;
            entityConfigurators.Add(entityCfg);
        }

        protected virtual EntityCfgOptionsBase GetEntityCfgOptions<TEntityCfg>(EntityTypeBuilder entityTypeBuilder)
            where TEntityCfg : EntityCfgBase
        {
            ConstructorInfo constructorInfo = this.GetEntityCfgOptionsTypeConstructor<TEntityCfg>(entityTypeBuilder);
            EntityCfgOptionsBase entityCfgOptions = constructorInfo.Invoke(new object[0]) as EntityCfgOptionsBase;

            return entityCfgOptions;
        }

        protected virtual ConstructorInfo GetEntityCfgOptionsTypeConstructor<TEntityCfg>(
            EntityTypeBuilder entityTypeBuilder)
            where TEntityCfg : EntityCfgBase
        {
            ConstructorInfo constructorInfo = typeof(TEntityCfg).GetConstructors(
                BindingFlags.Public | BindingFlags.Instance).Single(
                ctr => this.AreEntityCfgOptsTypeConstrDepsResolvable(ctr));

            return constructorInfo;
        }

        private bool AreEntityCfgOptsTypeConstrDepsResolvable(ConstructorInfo constructorInfo)
        {
            ParameterInfo[] parameterInfos = constructorInfo.GetParameters();
            bool retVal = parameterInfos.Length == 2;

            retVal = retVal && typeof(EntityTypeBuilder).IsAssignableFrom(parameterInfos[0].ParameterType);
            retVal = retVal && typeof(EntityCfgBase).IsAssignableFrom(parameterInfos[1].ParameterType);

            return retVal;
        }
    }
}
