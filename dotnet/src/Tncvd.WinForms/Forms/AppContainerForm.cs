using System;
using System.Drawing;
using Tncvd.WinForms.Logging;

namespace Tncvd.WinForms.Forms
{
    public partial class AppContainerForm : AppFormBase
    {
        #region Fields

        private const int DEFAULT_MENU_STRIP_HEIGHT_PX = 25;

        #endregion Fields

        #region Constructors
        public AppContainerForm()
        {
            this.InitializeComponent();
            this.InitForm();
        }

        #endregion Constructors

        #region Properties

        protected override bool InitLoggerManually => true;

        #endregion Properties

        #region Methods

        public void InitTextBoxLoggers()
        {
            TextBoxLoggerFactory.Instance.RegisterDefaultLoggingRichTextBox(this.richTextBoxAppLogs);
            TextBoxLoggerFactory.Instance.RegisterDefaultOutputRichTextBox(this.richTextBoxOutput);
            this.InitLogger();
        }

        #region Methods - Init Form

        protected override void InitForm()
        {
            base.InitForm();
            this.SetupLayout();
        }

        private void SetupLayout()
        {
            this.FormTabControl.SelectedTab = this.appManagerTabPage;
            this.formSplitPannel.Panel1.ClientSize = new Size(this.formSplitPannel.Size.Width, DEFAULT_MENU_STRIP_HEIGHT_PX);
            this.formSplitPannel.SizeChanged += this.FormSplitContainer_SizeChanged;
        }

        #endregion Methods - Init Form

        #region Methods - Validation

        #endregion Methods - Validation

        #region WinForm Controls Events

        private void FormSplitContainer_SizeChanged(object sender, EventArgs e)
        {
            this.formSplitPannel.Panel1.ClientSize = new Size(this.formSplitPannel.Size.Width, DEFAULT_MENU_STRIP_HEIGHT_PX);
        }

        private void AppContainerForm_Load(object sender, EventArgs e)
        {
        }

        #endregion WinForm Controls Events

        #endregion Methods
    }
}
