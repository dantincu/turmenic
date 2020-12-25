using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppTextBox : TextBox
    {
        public AppTextBox()
        {
            HelperMethods.AddAppTextBoxProperties(this);
        }
    }
}
