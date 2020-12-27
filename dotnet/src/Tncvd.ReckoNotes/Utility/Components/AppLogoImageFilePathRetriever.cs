using Tncvd.FileSystem.Components.Base;

namespace Tncvd.FileSystem.Components
{
    public class AppLogoImageFilePathRetriever : IconImageFilePathRetrieverBase
    {
        public const string APP_LOGO_RELATIVE_DIR_NAME = "AppLogo";
        public const string APP_LOGO_FILE_NAME_PREFIX = "AppLogo";
        public const string APP_LOGO_SQUARE_FILE_NAME_PART = "square";

        public AppLogoImageFilePathRetriever(
            IconImageFileNameSizePixels size = IconImageFileNameSizePixels.Size16,
            ImageFileType iconImageFileType = ImageFileType.Ico,
            bool isFullIcon = false) : base(size,
                iconImageFileType,
                isFullIcon)
        {
        }

        protected override string GetFileNamePrefixSegment()
        {
            return APP_LOGO_FILE_NAME_PREFIX;
        }

        protected override string GetFileNameVariantSegment()
        {
            return this.IsMainIcon ? null : APP_LOGO_SQUARE_FILE_NAME_PART;
        }

        protected override string GetFileRelativeDirName()
        {
            return null;
        }

        protected override string GetFileDirName()
        {
            return APP_LOGO_RELATIVE_DIR_NAME;
        }
    }
}
