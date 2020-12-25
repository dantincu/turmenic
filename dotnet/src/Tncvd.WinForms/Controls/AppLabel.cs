using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppLabel : Label
    {
        public AppLabel()
        {
            HelperMethods.AddAppLabelProperties(this);
        }
    }
}
