using Tncvd.WinForms.Controls;
using Tncvd.WinForms.Forms.AppForm.Base;

namespace Tncvd.WinForms.Forms.AppWindow
{
    public partial class AppWindowUC : AppFormUCBase
    {
        public AppWindowUC()
        {
            this.InitializeComponent();
        }

        public AppPanel MainContentPanel => this.mainContentPanel;
        public System.Windows.Forms.MenuStrip MainMenuStrip => this.mainMenuStrip;
        public System.Windows.Forms.StatusStrip MainStatusStrip => this.mainStatusStrip;

        protected override void AddControlProperties()
        {
            base.AddControlProperties();
        }

        protected override void AddControls()
        {
            base.AddControls();
        }
    }
}
