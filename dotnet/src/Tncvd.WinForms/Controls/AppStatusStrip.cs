using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public class AppStatusStrip : StatusStrip
    {
        public AppStatusStrip()
        {
            Utility.HelperMethods.AddAppStatusStripProperties(this);
        }
    }
}
