using Tncvd.FileSystem;
using Tncvd.FileSystem.Components;

namespace Tncvd.ReckoNotes.Utility
{
    public static partial class HelperMethods
    {
        public static string GetAppLogoImageFilePath(IconImageFileNameSizePixels size = IconImageFileNameSizePixels.Size16)
        {
            return new AppLogoImageFilePathRetriever(size).GetFilePath();
        }
    }
}
