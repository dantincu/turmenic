using Microsoft.EntityFrameworkCore;
using Turmenic.DataAccess.Sqlite.Test.Xunit.Config;
using Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels;
using Turmenic.DataAccess.Sqlite.UnitOfWork;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.UnitOfWork
{
    public class AppDbContext : I18nAppDbContextBase<ModelConfigurator>
    {
        public DbSet<Address> Addresses { get; set; }
        public DbSet<AdministrativeArea> AdministrativeAreas { get; set; }
        public DbSet<AdministrativeAreaName> AdministrativeAreaNames { get; set; }
        public DbSet<AdministrativeRegion> AdministrativeRegions { get; set; }
        public DbSet<AdministrativeRegionName> AdministrativeRegionNames { get; set; }
        public DbSet<AdministrativeSubdivision> AdministrativeSubdivisions { get; set; }
        public DbSet<AdministrativeSubdivisionName> AdministrativeSubdivisionNames { get; set; }
        public DbSet<Catalogue> Catalogues { get; set; }
        public DbSet<CatalogueName> CatalogueNames { get; set; }
        public DbSet<CatalogueItem> CatalogueItems { get; set; }
        public DbSet<CatalogueItemName> CatalogueItemNames { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<CityDistrict> CityDistricts { get; set; }
        public DbSet<Continent> Continents { get; set; }
        public DbSet<ContinentName> ContinentNames { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<CountryName> CountrieNames { get; set; }
        public DbSet<County> Counties { get; set; }
        public DbSet<MetropolitanArea> MetropolitanAreas { get; set; }
        public DbSet<MetropolitanAreaName> MetropolitanAreaNames { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<StringPkEntity> StringPkEntities { get; set; }
        public DbSet<StringPkEntityName> StringPkEntityNames { get; set; }
        public DbSet<Town> Towns { get; set; }
        public DbSet<Village> Villages { get; set; }
    }
}
