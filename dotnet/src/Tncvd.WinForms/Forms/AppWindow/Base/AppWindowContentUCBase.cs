using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms.AppWindow.Base
{
    public partial class AppWindowContentUCBase : AppUserControl
    {
        public AppWindowContentUCBase()
        {
            this.InitializeComponent();
        }

        protected override void AddControlProperties()
        {
            base.AddControlProperties();

            this.Dock = System.Windows.Forms.DockStyle.Fill;
        }

        protected override void AddControls()
        {
            base.AddControls();
        }
    }
}
