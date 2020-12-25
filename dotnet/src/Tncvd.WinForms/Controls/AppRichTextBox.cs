using System.Windows.Forms;
using Tncvd.WinForms.Utility;

namespace Tncvd.WinForms.Controls
{
    public class AppRichTextBox : RichTextBox
    {
        public AppRichTextBox()
        {
            HelperMethods.AddAppRichTextBoxProperties(this);
        }
    }
}
