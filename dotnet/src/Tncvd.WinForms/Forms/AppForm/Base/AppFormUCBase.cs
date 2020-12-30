using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms.AppForm.Base
{
    public partial class AppFormUCBase : AppUserControl
    {
        public AppFormUCBase()
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
