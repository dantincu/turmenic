using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tncvd.FileSystem
{
    public static class HelperMethods
    {
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
    }
}
