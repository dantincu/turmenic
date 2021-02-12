using System.Drawing;
using System.Windows.Forms;
using Turmenic.Core.Reflection;
using Turmenic.WinForms.Forms;

namespace Turmenic.WinForms.Test.App
{
    public partial class MainWindow : TdLargeWindowBase
    {
        public MainWindow()
        {
            // this.InitializeComponent();
        }

        [AutoInit]
        protected MainWindowUC WindowUC { get; set; }

        protected override void InitForm()
        {
            base.InitForm();

            this.WindowUC = this.AddFormUC<MainWindowUC>();
            this.WindowState = FormWindowState.Maximized;
            this.Text = "Test App";
            this.Icon = new Icon(Ux.FileSystem.HelperMethods.GetAppCreatorLogoImageFilePath(Ux.FileSystem.IconImageFileNameSizePixels.Size32));
        }
    }
}
