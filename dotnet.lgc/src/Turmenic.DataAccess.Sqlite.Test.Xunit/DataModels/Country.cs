using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class Country : NamedEntityI18nBase<Country, short, CountryName, int>
    {
        public string CountryCode { get; set; }
        public byte ContinentId { get; set; }
        public Continent Continent { get; set; }
        public List<State> States { get; set; }
        public List<County> Counties { get; set; }
    }

    public class CountryName : EntityNameI18nBase<Country, short, CountryName, int>
    {
        public int CountryId { get; set; }
        public Country Country { get; set; }
    }
}
