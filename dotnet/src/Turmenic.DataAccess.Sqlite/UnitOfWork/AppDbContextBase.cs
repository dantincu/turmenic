using Microsoft.EntityFrameworkCore;

namespace Turmenic.DataAccess.Sqlite.UnitOfWork
{
    public abstract class AppDbContextBase : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={this.DbFilePath};");
        }

        protected abstract string DbFilePath { get; }
    }
}
