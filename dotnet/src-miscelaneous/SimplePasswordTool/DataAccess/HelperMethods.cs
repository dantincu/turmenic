using Common;
using DataAccess;

namespace SimplePasswordTool.DataAccess
{
    public static partial class HelperMethods
    {
        public const string DATABASE_LOCATION_DIR_NAME = "PasswordVelocityDb";

        public static DbSession GetDefaultDbSession()
        {
            string dbFilePath = GetDbSystemFilePath();

            DbSession dbSession = new DbSession(
                dbFilePath,
                Common.FileSystem.HelperMethods.IsDirEmpty(dbFilePath));

            return dbSession;
        }

        public static string GetDbSystemFilePath()
        {
            return AppEnvConfigContainer.Instance.GetEnvPath(typeof(HelperMethods).Assembly, AppEnvFolderType.Data, DATABASE_LOCATION_DIR_NAME); ;
        }
    }
}
