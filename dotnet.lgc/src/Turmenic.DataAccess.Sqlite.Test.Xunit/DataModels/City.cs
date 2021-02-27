using System.Collections.Generic;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class City : AdministrativeArea
    {
        public short? CountryId { get; set; }
        public Country Country { get; set; }
        public List<CityDistrict> CityDistricts { get; set; }
    }
}
