using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class CatalogueItem : NamedEnumEntityI18nBase<int, CatalogueItemName, long>
    {
        public short CatalogueId { get; set; }
        public Catalogue Catalogue { get; set; }
    }

    public class CatalogueItemName : EnumEntityNameI18nBase<CatalogueItem, int, CatalogueItemName, long>
    {
    }
}
