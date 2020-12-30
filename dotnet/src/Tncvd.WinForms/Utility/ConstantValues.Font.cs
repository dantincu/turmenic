using System.Drawing;

namespace Tncvd.WinForms.Utility
{
    public static partial class ConstantValues
    {
        public static class Fonts
        {
            public static readonly Font DefaultMonospaceFont = new Font(
                Ux.Text.ConstantValues.DEFAULT_MONOSPACE_FONT_FAMILY_NAME,
                9F,
                FontStyle.Regular,
                GraphicsUnit.Point);
        }
    }
}
