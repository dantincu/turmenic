using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppGroupBox : GroupBox
    {
        public AppGroupBox()
        {
            HelperMethods.AddAppGroupBoxProperties(this);
        }
    }
}
