using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class Continent : NamedEntityI18nBase<Continent, byte, ContinentName, short>
    {
        public List<Country> Countries { get; set; }
    }

    public class ContinentName : EntityNameI18nBase<Continent, byte, ContinentName, short>
    {
    }
}
