using System.IO;
using System.Linq;

namespace Common.FileSystem
{
    public static partial class HelperMethods
    {
        public static bool IsDirEmpty(string dirPath)
        {
            bool dirNotEmpty = Directory.Exists(dirPath);

            dirNotEmpty = dirNotEmpty && Directory.GetFileSystemEntries(
                    dirPath,
                    "*",
                    SearchOption.TopDirectoryOnly)
                .Any();

            return (dirNotEmpty == false);
        }
    }
}
