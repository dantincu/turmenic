using Microsoft.EntityFrameworkCore;
using System.Linq;
using Turmenic.Core.AppConfig;
using Turmenic.DataAccess.Sqlite.Test.Console.App.Entities;
using Turmenic.DataAccess.Sqlite.UnitOfWork;

namespace Turmenic.DataAccess.Sqlite.Test.Console.App.Components
{
    public class AppDbContext : AppDbContextBase
    {
        public DbSet<Country> Countries { get; set; }

        protected override string DbFilePath => EnvConfigContainer.Instance.GetEnvRelPath(
            EnvDir.Data,
            this.GetType().Assembly,
            ConstantValues.SqliteDataFilePathParts.ToArray());

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>().ToTable("Countries").HasKey(et => et.Id);
        }
    }
}
