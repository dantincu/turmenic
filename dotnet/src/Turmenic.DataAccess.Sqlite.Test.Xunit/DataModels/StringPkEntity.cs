using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class StringPkEntity : NamedEntityI18nBase<string, StringPkEntityName, int>
    {
    }

    public class StringPkEntityName : EntityNameI18nBase<StringPkEntity, string, StringPkEntityName, int>
    {
    }
}
