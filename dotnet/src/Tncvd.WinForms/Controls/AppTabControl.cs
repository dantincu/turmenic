using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public partial class AppTabControl : TabControl
    {
        public AppTabControl()
        {
            HelperMethods.AddAppTabControlProperties(this);
        }
    }
}
