using System.Linq;
using Turmenic.Core.AppConfig;
using Turmenic.DataAccess.Sqlite.UnitOfWork;
using ParentConst = Turmenic.DataAccess.Sqlite.ConstantValues;

namespace Turmenic.DriveExplorer.DataAccess.Sqlite.UnitOfWork
{
    public class AppDbContext : AppDbContextBase
    {
        protected override string DbFilePath => EnvConfigContainer.Instance.GetEnvRelPath(
            EnvDir.Data,
            ParentConst.SqliteDataFilePathParts.ToArray());
    }
}
