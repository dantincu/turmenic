using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    /// <summary>
    /// Entity representing either a village or a city district (city subdivision).
    /// </summary>
    public class AdministrativeSubdivision : NamedEntityI18nBase<AdministrativeSubdivision, long, AdministrativeSubdivisionName, long>
    {
        public int AdministrativeSubdivisionTypeId { get; set; }
        public long? AdministrativeAreaId { get; set; }
        public long? CityId { get; set; }
        public long? TownId { get; set; }
        public AdministrativeSubdivisionTypeCtlg AdministrativeSubdivisionType { get; set; }
        public AdministrativeArea AdministrativeArea { get; set; }
    }

    public class AdministrativeSubdivisionName : EntityNameI18nBase<AdministrativeSubdivision, long, AdministrativeSubdivisionName, long>
    {
    }

    public class AdministrativeSubdivisionTypeCtlg : CatalogueItem
    {
    }

    public enum AdministrativeSubdivisionType
    {
        CityDistrict = 1,
        Village = 2
    }
}
