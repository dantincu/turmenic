namespace Tncvd.Ux.FileSystem.FilePathRetriever.Base
{
    public abstract class ImageFilePathRetrieverBase : ContentFilePathRetrieverBase
    {
        public ImageFilePathRetrieverBase(
            int sizeX,
            int sizeY,
            ImageFileType iconImageFileType = ImageFileType.Jpg)
        {
            SizeX = sizeX;
            SizeY = sizeY;
            IconImageFileType = iconImageFileType;
        }

        protected int SizeX { get; }

        protected int SizeY { get; }

        protected ImageFileType IconImageFileType { get; }

        protected override string GetFileExtension()
        {
            return IconImageFileType.GetImageFileExtension();
        }
    }
}
