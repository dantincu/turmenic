using System.Collections.Generic;
using Tncvd.AppConfig.Env;
using Tncvd.FileSystem;

namespace Tncvd.ReckoNotes.Utility
{
    public static partial class HelperMethods
    {
        public static string GetAppLogoImageFilePath(int sizeX, int sizeY, IconImageFileType iconImageFileType = IconImageFileType.Ico, bool isFullLogo = false)
        {
            string appLogoImageFilePath = AppEnvConfigContainer.Instance.GetEnvContentPath(
                    typeof(HelperMethods).Assembly,
                    ConstantValues.APP_LOGO_RELATIVE_DIR_NAME,
                    GetAppLogoImageFileName(sizeX, sizeY, iconImageFileType, isFullLogo));

            return appLogoImageFilePath;
        }

        public static string GetAppLogoImageFileName(int sizeX, int sizeY, IconImageFileType iconImageFileType = IconImageFileType.Ico, bool isFullLogo = false)
        {
            string[] appLogoImageFileNameSegments = GetAppLogoImageFileNameSegments(sizeX, sizeY, iconImageFileType, isFullLogo);

            string appLogoImageFileName = FileSystem.HelperMethods.GetSlugFileNameFromSegments(
                FileSystem.HelperMethods.GetIconImageFileExtension(iconImageFileType),
                appLogoImageFileNameSegments);

            return appLogoImageFileName;
        }

        public static string GetAppLogoImageFilePath(int size, IconImageFileType iconImageFileType = IconImageFileType.Ico, bool isFullLogo = false)
        {
            string appLogoImageFilePath = GetAppLogoImageFilePath(size, size, iconImageFileType, isFullLogo);
            return appLogoImageFilePath;
        }

        public static string GetAppLogoImageFileName(int size, IconImageFileType iconImageFileType = IconImageFileType.Ico, bool isFullLogo = false)
        {
            string appLogoImageFileName = GetAppLogoImageFileName(size, size, iconImageFileType, isFullLogo);
            return appLogoImageFileName;
        }

        private static string[] GetAppLogoImageFileNameSegments(int sizeX, int sizeY, IconImageFileType iconImageFileType = IconImageFileType.Ico, bool isFullLogo = false)
        {
            List<string> appLogoImageFileNameSegments = new List<string>();
            appLogoImageFileNameSegments.Add(ConstantValues.APP_LOGO_FILE_NAME_PREFIX);

            if (isFullLogo == false)
            {
                appLogoImageFileNameSegments.Add(ConstantValues.APP_LOGO_SQUARE_FILE_NAME_PART);
            }

            appLogoImageFileNameSegments.Add(string.Format(FileSystem.ConstantValues.IMAGE_FILE_NAME_RESOLUTION_PART_FORMAT, sizeX, sizeY));
            return appLogoImageFileNameSegments.ToArray();
        }
    }
}
