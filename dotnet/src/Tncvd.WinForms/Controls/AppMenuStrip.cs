using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public class AppMenuStrip : MenuStrip
    {
        public AppMenuStrip()
        {
            Utility.HelperMethods.AddAppMenuStripProperties(this);
        }
    }
}
