using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppTabPage : TabPage
    {
        public AppTabPage()
        {
            HelperMethods.AddAppTabPageProperties(this);
        }
    }
}
