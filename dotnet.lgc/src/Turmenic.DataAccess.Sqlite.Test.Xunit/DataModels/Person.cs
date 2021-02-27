using System;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class Person : EntityBase<Guid>
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string OtherNames { get; set; }
        public string FullName { get; set; }
        public string AlternativeNames { get; set; }
        public string Title { get; set; }
        public short? Age { get; set; }
        public DateTime? BirthDate { get; set; }
        public string OfficialDomicileAddressId { get; set; }
        public string CurrentResidenceAddressId { get; set; }
        public short? PrimaryCitizenshipCountryId { get; set; }
        public short? SecondaryCitizenshipCountryId { get; set; }
        public Address OfficialDomicileAddress { get; set; }
        public Address CurrentResidenceAddress { get; set; }
        public Country PrimaryCitizenshipCountry { get; set; }
        public Country SecondaryCitizenshipCountry { get; set; }
    }
}
