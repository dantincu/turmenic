using Common;
using DataAccess;
using System.IO;

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
                Common.FileSystem.HelperMethods.IsDirEmpty(dbDirPath));

            return dbSession;
        }

        public static string AssureDbSystemDirPath()
        {
            string dirPath = AppEnvConfigContainer.Instance.GetEnvPath(typeof(HelperMethods).Assembly, AppEnvFolderType.Data, DATABASE_LOCATION_DIR_NAME); ;

            if (Directory.Exists(dirPath) == false)
            {
                Directory.CreateDirectory(dirPath);
            }

            return dirPath;
        }
    }
}
