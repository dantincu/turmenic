﻿using System.Linq;
using Tncvd.Core.FileSystem.Components.Base;
using Tncvd.Core.Text;

namespace Tncvd.Core.FileSystem.Components
{
    public class AppCreatorLogoImageFilePathRetriever : IconImageFilePathRetrieverBase
    {
        public const string LOGO_IMAGE_FILE_NAME_SUFFIX = "Logo";
        public const string APP_CREATOR_LOGO_RELATIVE_DIR_NAME = "AppCreator" + LOGO_IMAGE_FILE_NAME_SUFFIX;
        public const string COMPLETE_APP_CREATOR_LOGO_FILE_NAME_SEGMENT = "complete";

        public static readonly string AppCreatorLogoFileNamePrefix = Utils.ConstantValues.RootNamespacePascalCase + LOGO_IMAGE_FILE_NAME_SUFFIX;
        public static readonly string CompleteAppCreatorLogoFileRelDirName = COMPLETE_APP_CREATOR_LOGO_FILE_NAME_SEGMENT.FirstLetterToUpper();

        public AppCreatorLogoImageFilePathRetriever(
            IconImageFileNameSizePixels size = IconImageFileNameSizePixels.Size16,
            ImageFileType iconImageFileType = ImageFileType.Ico,
            bool isFullIcon = false) : base(size,
                iconImageFileType,
                isFullIcon)
        {
        }

        protected override string GetFileNamePrefixSegment()
        {
            return AppCreatorLogoFileNamePrefix;
        }

        protected override string GetFileNameVariantSegment()
        {
            return this.IsMainIcon ? COMPLETE_APP_CREATOR_LOGO_FILE_NAME_SEGMENT : null;
        }

        protected override string GetFileRelativeDirName()
        {
            return this.IsMainIcon ? CompleteAppCreatorLogoFileRelDirName : null;
        }

        protected override string GetFileDirName()
        {
            return APP_CREATOR_LOGO_RELATIVE_DIR_NAME;
        }
    }
}
