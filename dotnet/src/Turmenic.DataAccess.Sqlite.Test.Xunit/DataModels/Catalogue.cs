using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class Catalogue : NamedEnumEntityI18nBase<Catalogue, short, CatalogueName, int>
    {
    }

    public class CatalogueName : EnumEntityNameI18nBase<Catalogue, short, CatalogueName, int>
    {
    }
}
