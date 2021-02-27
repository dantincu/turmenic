using Microsoft.EntityFrameworkCore;
using System;
using Turmenic.DataAccess.EntityFrameworkCore.Config;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.UnitOfWork
{
    public abstract class AppDbContextBase : DbContext
    {
    }

    public abstract class AppDbContextBase<TModelConfigurator> : AppDbContextBase
        where TModelConfigurator : ModelConfiguratorBase
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            TModelConfigurator modelConfigurator = this.GetModelConfigurator(modelBuilder);
            modelConfigurator.ConfigureModel();
        }

        protected virtual TModelConfigurator GetModelConfigurator(ModelBuilder modelBuilder)
        {
            TModelConfigurator modelConfigurator = Activator.CreateInstance(typeof(TModelConfigurator), modelBuilder) as TModelConfigurator;
            return modelConfigurator;
        }
    }

    public abstract class BasicI18nAppDbContextBase<TModelConfigurator> : AppDbContextBase<TModelConfigurator>
        where TModelConfigurator : ModelConfiguratorBase
    {
        public DbSet<LanguageI18n> LanguageI18Ns { get; set; }
    }

    public abstract class I18nAppDbContextBase<TModelConfigurator> : BasicI18nAppDbContextBase<TModelConfigurator>
        where TModelConfigurator : ModelConfiguratorBase
    {
        public DbSet<LanguageI18nName> LanguageI18NNames { get; set; }
    }
}
