using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    /// <summary>
    /// Entity representing either a city, municipality, or a town.
    /// </summary>
    public class AdministrativeArea : NamedEntityI18nBase<AdministrativeArea, int, AdministrativeAreaName, int>
    {
        public int AdministrativeAreaTypeId { get; set; }
        public int? AdministrativeRegionId { get; set; }
        public int? CountyId { get; set; }
        public int? StateId { get; set; }
        public long? MetropolitanAreaId { get; set; }
        public AdministrativeAreaTypeCtlg AdministrativeAreaType { get; set; }
        public AdministrativeRegion AdministrativeRegion { get; set; }
        public County County { get; set; }
        public State State { get; set; }
        public MetropolitanArea MetropolitanArea { get; set; }
        public List<AdministrativeSubdivision> AdministrativeSubdivisions { get; set; }
    }

    public class AdministrativeAreaName : EntityNameI18nBase<AdministrativeArea, int, AdministrativeAreaName, int>
    {
    }

    public class AdministrativeAreaTypeCtlg : CatalogueItem
    {
    }

    public enum AdministrativeAreaType
    {
        City = 1,
        Municipality = 2,
        Town = 3
    }
}
