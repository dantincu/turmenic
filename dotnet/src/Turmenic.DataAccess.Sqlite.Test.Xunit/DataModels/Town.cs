using System.Collections.Generic;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels
{
    public class Town : AdministrativeArea
    {
        public string PostalCode { get; set; }
        public List<Village> Villages { get; set; }
    }
}
