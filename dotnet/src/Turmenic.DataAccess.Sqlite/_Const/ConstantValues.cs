using System.Collections.ObjectModel;

namespace Turmenic.DataAccess.Sqlite
{
    public static class ConstantValues
    {
        public const string SQLITE_ROOT_DATA_DIR_NAME = "sqlite";
        public const string DATABASE_DIR_NAME = "data";
        public const string DATABASE_FILE_NAME = "data.db";

        public static readonly ReadOnlyCollection<string> SqliteDataFilePathParts = new ReadOnlyCollection<string>(new string[] {
            SQLITE_ROOT_DATA_DIR_NAME,
            DATABASE_DIR_NAME,
            DATABASE_FILE_NAME
        });
    }
}
