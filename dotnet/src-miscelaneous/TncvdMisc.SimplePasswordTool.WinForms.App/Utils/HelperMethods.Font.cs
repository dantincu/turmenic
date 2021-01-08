using System.Drawing;

namespace SimplePasswordTool.Utils
{
    public static partial class HelperMethods
    {
        public static Font ToItalic(this Font font)
        {
            return new Font(font, FontStyle.Italic);
        }

        public static Font ToBold(this Font font)
        {
            return new Font(font, FontStyle.Bold);
        }

        public static Font ToBoldItalic(this Font font)
        {
            return new Font(font, FontStyle.Bold | FontStyle.Italic);
        }

        public static Font ToUnderline(this Font font)
        {
            return new Font(font, FontStyle.Underline);
        }

        public static Font ToStrikeout(this Font font)
        {
            return new Font(font, FontStyle.Strikeout);
        }
    }
}
