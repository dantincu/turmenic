using Turmerik.Ux.FileSystem.FilePathRetriever;

namespace Turmerik.Ux.FileSystem
{
    public static partial class HelperMethods
    {
        public static string GetImageFileExtension(this ImageFileType iconImageFileType)
        {
            string extension = null;

            switch (iconImageFileType)
            {
                case ImageFileType.Ico:
                    extension = Core.FileSystem.ConstantValues.CommonImageFileExtensions.ICO;
                    break;
                case ImageFileType.Png:
                    extension = Core.FileSystem.ConstantValues.CommonImageFileExtensions.PNG;
                    break;
                case ImageFileType.Jpg:
                    extension = Core.FileSystem.ConstantValues.CommonImageFileExtensions.JPG;
                    break;
                case ImageFileType.Bmp:
                    extension = Core.FileSystem.ConstantValues.CommonImageFileExtensions.BMP;
                    break;
                case ImageFileType.Gif:
                    extension = Core.FileSystem.ConstantValues.CommonImageFileExtensions.GIF;
                    break;
            }

            return extension;
        }

        public static string GetAppCreatorLogoImageFilePath(IconImageFileNameSizePixels size = IconImageFileNameSizePixels.Size16)
        {
            return new AppCreatorLogoImageFilePathRetriever(size).GetFilePath();
        }
    }
}
