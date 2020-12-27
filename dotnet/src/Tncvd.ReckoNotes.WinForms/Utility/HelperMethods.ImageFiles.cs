using Tncvd.FileSystem;
using Tncvd.FileSystem.Components;

namespace Tncvd.ReckoNotes.WinForms.Utility
{
    public static partial class HelperMethods
    {
        public static string GetAppLogoImageFilePath(IconImageFileNameSizePixels size = IconImageFileNameSizePixels.Size32)
        {
            return new AppLogoImageFilePathRetriever(size).GetFilePath();
        }
    }
}
