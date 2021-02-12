using System.Linq;
using Turmenic.DataAccess.Sqlite.Test.Console.App.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Console.App.Components
{
    public class TestComponent
    {
        public void Run()
        {
            using AppDbContext ctx = new AppDbContext();
            Country entity = this.PrintEntity(ctx);

            string name = System.Console.ReadLine();
            this.UpsertEntity(ctx, entity, name);
        }

        private Country PrintEntity(AppDbContext ctx)
        {
            Country entity = ctx.Countries.SingleOrDefault();

            if (entity == null)
            {
                System.Console.WriteLine("No entities (countries) found. Enter the name for the new entity (country) or just press the ENTER key to quit now:");
            }
            else
            {
                System.Console.WriteLine($"Entity(country) id: {entity.Id}");
                System.Console.WriteLine($"Entity(country) name: {entity.Name}");
                System.Console.WriteLine("Enter the new name for the current entity (country) or just press the ENTER key to quit now:");
            }

            return entity;
        }

        private void UpsertEntity(AppDbContext ctx, Country entity, string entityName)
        {
            if (string.IsNullOrWhiteSpace(entityName) == false)
            {
                if (entity == null)
                {
                    entity = new Country();
                }

                entity.Name = entityName;

                if (entity.Id == 0)
                {
                    ctx.Countries.Add(entity);
                }

                ctx.SaveChanges();
            }
        }
    }
}
