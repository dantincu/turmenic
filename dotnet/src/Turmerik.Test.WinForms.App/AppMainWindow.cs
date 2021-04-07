using System.Drawing;
using System.Windows.Forms;
using Turmerik.Core.Reflection;
using Turmerik.WinForms.Forms;

namespace Turmerik.Test.WinForms.App
{
    public partial class AppMainWindow : TdLargeWindowBase
    {
        public AppMainWindow()
        {
            // this.InitializeComponent();
        }

        [AutoInit]
        protected AppMainWindowUC WindowUC { get; set; }

        protected override void InitForm()
        {
            base.InitForm();

            this.WindowUC = this.AddFormUC<AppMainWindowUC>();
            this.WindowState = FormWindowState.Maximized;
            this.Text = "Test App";
            // this.Icon = new Icon(Ux.FileSystem.HelperMethods.GetAppCreatorLogoImageFilePath(Ux.FileSystem.IconImageFileNameSizePixels.Size32));
        }
    }
}
