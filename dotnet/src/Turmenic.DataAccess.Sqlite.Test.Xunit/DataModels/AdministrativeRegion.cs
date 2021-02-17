using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    /// <summary>
    /// Entity representing either a county (subdivision of country)
    /// or a federated state (e.g. like a state in the US, Austria, Germany or the Russian Federation etc).
    /// </summary>
    public class AdministrativeRegion : NamedEntityI18nBase<int, AdministrativeRegionName, int>
    {
        public int AdministrativeRegionTypeId { get; set; }
        public short CountryId { get; set; }
        public string Code { get; set; }
        public AdministrativeRegionTypeCtlg AdministrativeRegionType { get; set; }
        public Country Country { get; set; }
        public List<AdministrativeArea> AdministrativeAreas { get; set; }
        public List<City> Cities { get; set; }
        public List<Town> Towns { get; set; }
    }

    public class AdministrativeRegionName : EntityNameI18nBase<AdministrativeRegion, int, AdministrativeRegionName, int>
    {
    }

    public class AdministrativeRegionTypeCtlg : CatalogueItem
    {
    }

    public enum AdministrativeRegionType
    {
        County = 1,
        State = 2
    }
}
