using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public class AppSplitContainer : SplitContainer
    {
        public AppSplitContainer()
        {
            Utility.HelperMethods.AddAppSplitContainerProperties(this);
        }
    }
}
