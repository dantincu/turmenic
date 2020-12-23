using System.IO;
using System.Linq;

namespace Tncvd.FileSystem
{
    public static partial class HelperMethods
    {
        #region Slug

        public static string GetFileName(params string[] fileNameParts)
        {
            string fileName = fileNameParts.Aggregate((leftPart, rightPart) => $"{leftPart}{ConstantValues.FILE_NAME_EXTENSION_DELIMITER}{rightPart}");
            return fileName;
        }

        public static string GetSlugFileNameFromSegments(string fileNameExtension = null, params string[] fileNameSegments)
        {
            string slug = Text.SlugsHelperMethods.GetSlugFromSegments(fileNameSegments);
            string fileName = GetFileName(slug, fileNameExtension);

            return fileName;
        }

        public static string GetSlugFileNameFromParts(string fileNameExtension = null, params string[] fileNameParts)
        {
            string slug = Text.SlugsHelperMethods.GetSlugFromParts(fileNameParts);
            string fileName = GetFileName(slug, fileNameExtension);

            return fileName;
        }

        public static string GetSlugFileName(string fileNameExtension = null, params string[][] fileNameSegmentParts)
        {
            string slug = Text.SlugsHelperMethods.GetSlug(fileNameSegmentParts);
            string fileName = GetFileName(slug, fileNameExtension);

            return fileName;
        }

        #endregion Slug

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
    }
}