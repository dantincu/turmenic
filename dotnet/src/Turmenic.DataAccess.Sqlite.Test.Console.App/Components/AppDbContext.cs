using Microsoft.EntityFrameworkCore;
using Turmenic.DataAccess.Sqlite.Test.Console.App.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Console.App.Components
{
    public class AppDbContext : UnitOfWork.AppDbContextBase
    {
        public DbSet<Country> Countries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Country>().ToTable("Countries").HasKey(et => et.Id);
        }
    }
}
