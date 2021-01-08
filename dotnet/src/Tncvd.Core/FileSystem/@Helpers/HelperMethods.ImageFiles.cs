using Tncvd.Core.FileSystem.FilePathRetriever;

namespace Tncvd.Core.FileSystem
{
    public static partial class HelperMethods
    {
        public static string GetImageFileExtension(this ImageFileType iconImageFileType)
        {
            string extension = null;

            switch (iconImageFileType)
            {
                case ImageFileType.Ico:
                    extension = ConstantValues.CommonImageFileExtensions.ICO;
                    break;
                case ImageFileType.Png:
                    extension = ConstantValues.CommonImageFileExtensions.PNG;
                    break;
                case ImageFileType.Jpg:
                    extension = ConstantValues.CommonImageFileExtensions.JPG;
                    break;
                case ImageFileType.Bmp:
                    extension = ConstantValues.CommonImageFileExtensions.BMP;
                    break;
                case ImageFileType.Gif:
                    extension = ConstantValues.CommonImageFileExtensions.GIF;
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
