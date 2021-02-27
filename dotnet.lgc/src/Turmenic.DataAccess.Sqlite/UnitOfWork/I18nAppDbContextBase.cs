using Microsoft.EntityFrameworkCore;
using System.Linq;
using Turmenic.Core.AppConfig;
using Turmenic.DataAccess.EntityFrameworkCore.Config;

namespace Turmenic.DataAccess.Sqlite.UnitOfWork
{
    public abstract class I18nAppDbContextBase<TModelConfigurator> : EntityFrameworkCore.UnitOfWork.I18nAppDbContextBase<TModelConfigurator>
        where TModelConfigurator : ModelConfiguratorBase
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={this.DbFilePath};");
        }

        protected virtual string DbFilePath => EnvConfigContainer.Instance.GetEnvRelPath(
            EnvDir.Data,
            this.GetType().Assembly,
            ConstantValues.SqliteDataFilePathParts.ToArray());
    }
}
