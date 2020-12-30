using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public class AppPanel : Panel
    {
        public AppPanel()
        {
            Utility.HelperMethods.AddAppPanelProperties(this);
        }
    }
}
