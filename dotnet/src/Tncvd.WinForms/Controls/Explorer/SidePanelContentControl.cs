namespace Tncvd.WinForms.Controls.Explorer
{
    public partial class SidePanelContentControl : AppUserControl
    {
        public SidePanelContentControl()
        {
            this.InitializeComponent();
        }

        public AppSplitContainer MainSplitContainer => this.mainSplitContainer;
        public AppPanel SidePanelToolBar => this.sidePanelToolBar;

        protected bool ShowSidePanel { get; set; }

        protected override void AddControlProperties()
        {
            base.AddControlProperties();

            this.Dock = System.Windows.Forms.DockStyle.Fill;
        }

        protected override void AddControls()
        {
            base.AddControls();
        }

        protected void ToggleSidePanel(bool show)
        {
            if (show)
            {
                this.mainSplitContainer.Panel1Collapsed = false;
                this.btnHideSidePanelToolBox.Show();
                this.btnShowSidePanelToolBox.Hide();
            }
            else
            {
                this.mainSplitContainer.Panel1Collapsed = true;
                this.btnHideSidePanelToolBox.Hide();
                this.btnShowSidePanelToolBox.Show();
            }
        }

        private void btnHideSidePanelToolBox_Click(object sender, System.EventArgs e)
        {
            this.ToggleSidePanel(false);
        }

        private void btnShowSidePanelToolBox_Click(object sender, System.EventArgs e)
        {
            this.ToggleSidePanel(true);
        }

        private void SidePanelContentControl_Load(object sender, System.EventArgs e)
        {
            this.ToggleSidePanel(true);
        }
    }
}
