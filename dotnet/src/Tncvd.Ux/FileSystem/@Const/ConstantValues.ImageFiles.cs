namespace Tncvd.Ux.FileSystem
{
    public enum ImageFileType
    {
        Ico = 0,
        Png = 1,
        Jpg = 2,
        Bmp = 3,
        Gif = 4
    }

    public enum IconImageFileNameSizePixels
    {
        Size16 = ConstantValues.LogoImageFileNameResolution.SIZE_16_PX,
        Size24 = ConstantValues.LogoImageFileNameResolution.SIZE_24_PX,
        Size32 = ConstantValues.LogoImageFileNameResolution.SIZE_32_PX,
        Size48 = ConstantValues.LogoImageFileNameResolution.SIZE_48_PX,
        Size64 = ConstantValues.LogoImageFileNameResolution.SIZE_64_PX,
        Size96 = ConstantValues.LogoImageFileNameResolution.SIZE_96_PX,
        Size128 = ConstantValues.LogoImageFileNameResolution.SIZE_128_PX,
        Size196 = ConstantValues.LogoImageFileNameResolution.SIZE_196_PX,
    }

    public enum IconImageFileNameSizePixelsExtra
    {
        Size200 = ConstantValues.LogoImageFileNameResolutionExtra.SIZE_200_PX,
        Size256 = ConstantValues.LogoImageFileNameResolutionExtra.SIZE_256_PX,
    }

    public static partial class ConstantValues
    {
        public static class LogoImageFileNameResolution
        {
            public const int SIZE_16_PX = 16;
            public const int SIZE_24_PX = 24;
            public const int SIZE_32_PX = 32;
            public const int SIZE_48_PX = 48;
            public const int SIZE_64_PX = 64;
            public const int SIZE_96_PX = 96;
            public const int SIZE_128_PX = 128;
            public const int SIZE_196_PX = 196;
        }

        public static class LogoImageFileNameResolutionExtra
        {
            public const int SIZE_200_PX = 200;
            public const int SIZE_256_PX = 256;
        }
    }
}
