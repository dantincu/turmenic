using System;
using System.IO;
using System.Linq;

namespace Turmenic.Core.FileSystem
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

        public static string GetMachineAppDataFolderPath(params string[] relPathParts)
        {
            string path = Path.Combine(relPathParts);

            path = Path.Combine(
                Environment.GetFolderPath(
                    Environment.SpecialFolder.ApplicationData),
                path);

            return path;
        }

        #region Slug

        public static string GetFileName(params string[] fileNameParts)
        {
            fileNameParts = fileNameParts.Where(x => string.IsNullOrWhiteSpace(x) == false).ToArray();
            string fileName = fileNameParts.Aggregate((leftPart, rightPart) => $"{leftPart}{ConstantValues.FILE_NAME_EXTENSION_DELIMITER}{rightPart}");
            return fileName;
        }

        public static string GetSlugFileNameFromSegments(string fileNameExtension = null, params string[] fileNameSegments)
        {
            string slug = Text.HelperMethods.GetSlugFromSegments(fileNameSegments);
            string fileName = GetFileName(slug, fileNameExtension);

            return fileName;
        }

        public static string GetSlugFileNameFromParts(string fileNameExtension = null, params string[] fileNameParts)
        {
            string slug = Text.HelperMethods.GetSlugFromParts(fileNameParts);
            string fileName = GetFileName(slug, fileNameExtension);

            return fileName;
        }

        public static string GetSlugFileName(string fileNameExtension = null, params string[][] fileNameSegmentParts)
        {
            string slug = Text.HelperMethods.GetSlug(fileNameSegmentParts);
            string fileName = GetFileName(slug, fileNameExtension);

            return fileName;
        }

        #endregion Slug

        #region Directory

        public static string GetDefaultDestinationFilePath(string sourceFilePath, string destinationDirPath)
        {
            string fileName = Path.GetFileName(sourceFilePath);
            string destinationFilePath = Path.Combine(destinationDirPath, fileName);

            return destinationFilePath;
        }

        public static bool AssureDirectory(string dirPath)
        {
            bool created = false;

            if (Directory.Exists(dirPath) == false)
            {
                created = true;
                Directory.CreateDirectory(dirPath);
            }

            return created;
        }

        #endregion Directory
    }
}