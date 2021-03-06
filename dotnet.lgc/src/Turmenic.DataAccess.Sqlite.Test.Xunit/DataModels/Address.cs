﻿using System.Collections.Generic;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class Address : EntityBase<long>
    {
        public string StreetName { get; set; }
        public string StreetNumber { get; set; }
        public string BuildingNumber { get; set; }
        public string BuildingEntranceNumber { get; set; }
        public string BuildingFloorName { get; set; }
        public int? BuildingFloorNumber { get; set; }
        public string ApartmentNumber { get; set; }
        public string PostalCode { get; set; }
        public string AddressDetails { get; set; }
        public long? AdministrativeAreaId { get; set; }
        public long? AdministrativeSubdivisionId { get; set; }
        public int? AdministrativeRegionId { get; set; }
        public short? CountryId { get; set; }
        public AdministrativeArea AdministrativeArea { get; set; }
        public AdministrativeSubdivision AdministrativeSubdivision { get; set; }
        public AdministrativeRegion AdministrativeRegion { get; set; }
        public Country Country { get; set; }
        public List<Person> DomiciledPeople { get; set; }
        public List<Person> CurrentResidents { get; set; }
    }
}
