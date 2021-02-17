using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class MetropolitanArea : NamedEntityI18nBase<int, MetropolitanAreaName, int>
    {
        public int MetropolitanCityId { get; set; }
        public City MetropolitanCity { get; set; }
    }

    public class MetropolitanAreaName : EntityNameI18nBase<MetropolitanArea, int, MetropolitanAreaName, int>
    {
    }
}
