using Microsoft.EntityFrameworkCore;
using Turmenic.DataAccess.Sqlite.Test.Console.App.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Console.App.Components
{
    public class AppDbContext : UnitOfWork.I18nAppDbContextBase<ModelConfigurator>
    {
        public DbSet<Country> Countries { get; set; }
    }
}
