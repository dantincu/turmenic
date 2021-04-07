using System.Linq;

namespace Turmerik.Ux.FileSystem.FilePathRetriever.Base
{
    public abstract class IconImageFilePathRetrieverBase : ImageFilePathRetrieverBase
    {
        public const string IMAGE_FILE_NAME_RESOLUTION_PART_FORMAT = "{0}x{1}";

        public IconImageFilePathRetrieverBase(
            IconImageFileNameSizePixels size = IconImageFileNameSizePixels.Size16,
            ImageFileType iconImageFileType = ImageFileType.Ico,
            bool isMaincon = false) : this((int)size,
                iconImageFileType,
                isMaincon)
        {
        }

        public IconImageFilePathRetrieverBase(
            int size = (int)IconImageFileNameSizePixels.Size16,
            ImageFileType iconImageFileType = ImageFileType.Ico,
            bool isMaincon = false) : this(
                size,
                size,
                iconImageFileType,
                isMaincon)
        {
        }

        public IconImageFilePathRetrieverBase(
            int sizeX,
            int sizeY,
            ImageFileType iconImageFileType = ImageFileType.Ico,
            bool isMaincon = false) : base(
                sizeX,
                sizeY,
                iconImageFileType)
        {
            IsMainIcon = isMaincon;
        }

        protected bool IsMainIcon { get; }

        protected abstract string GetFileNamePrefixSegment();

        protected abstract string GetFileNameVariantSegment();

        protected abstract string GetFileBaseDirName();
        protected abstract string GetFileDirName();

        protected abstract string GetFileRelativeDirName();

        protected string GetImageResolutionSegment()
        {
            return string.Format(IMAGE_FILE_NAME_RESOLUTION_PART_FORMAT, this.SizeX, this.SizeY);
        }

        protected override string[] GetContentFileDirPathParts()
        {
            return new string[]
            {
                this.GetFileBaseDirName(),
                this.GetFileDirName(),
                this.GetFileRelativeDirName()
            }.Where(item => item != null).ToArray();
        }

        protected override string[] GetContentFileNameSegments()
        {
            return new string[]
            {
                this.GetFileNamePrefixSegment(),
                this.GetFileNameVariantSegment(),
                this.GetImageResolutionSegment()
            }.Where(item => item != null).ToArray();
        }
    }
}
