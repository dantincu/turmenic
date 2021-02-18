using Turmenic.DataAccess.VelocityDb.UnitOfWork;
using System.IO;
using Turmenic.Core.AppConfig;

namespace SimplePasswordTool.DataAccess.Utils
{
    public static partial class HelperMethods
    {
        public const string DATABASE_LOCATION_DIR_NAME = "PasswordVelocityDb";

        public static DbSession GetDefaultDbSession()
        {
            string dbDirPath = AssureDbSystemDirPath();

            DbSession dbSession = new DbSession(
                dbDirPath,
                Turmenic.Core.FileSystem.HelperMethods.IsDirEmpty(dbDirPath));

            return dbSession;
        }

        public static string AssureDbSystemDirPath()
        {
            string dirPath = EnvConfigContainer.Instance.GetEnvRelPath(EnvDir.Data, typeof(HelperMethods).Assembly, DATABASE_LOCATION_DIR_NAME); ;

            if (Directory.Exists(dirPath) == false)
            {
                Directory.CreateDirectory(dirPath);
            }

            return dirPath;
        }
    }
}
