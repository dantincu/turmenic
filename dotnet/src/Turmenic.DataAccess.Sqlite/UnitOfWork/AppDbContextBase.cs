using Microsoft.EntityFrameworkCore;
using System.Linq;
using Turmenic.Core.AppConfig;

namespace Turmenic.DataAccess.Sqlite.UnitOfWork
{
    public abstract class AppDbContextBase : EntityFrameworkCore.UnitOfWork.AppDbContextBase
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
