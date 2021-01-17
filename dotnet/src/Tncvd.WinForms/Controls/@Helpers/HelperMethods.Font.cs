using System.Drawing;
using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public static partial class HelperMethods
    {
        public static Font ToDerived(this Font font, FontStyle fontStyle, float emSize)
        {
            Font retFont = new Font(
                font.FontFamily,
                emSize,
                fontStyle);

            return retFont;
        }

        public static Font UpdateFont(this Control control, FontStyle fontStyle, float emSize)
        {
            Font font = control.Font.ToDerived(fontStyle, emSize);

            control.Font = font;
            return font;
        }

        public static Font UpdateFont(this ToolStripItem item, FontStyle fontStyle, float emSize)
        {
            Font font = item.Font.ToDerived(fontStyle, emSize);

            item.Font = font;
            return font;
        }

    }
}
