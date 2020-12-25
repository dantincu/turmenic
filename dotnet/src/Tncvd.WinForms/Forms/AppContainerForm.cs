using System;
using System.Drawing;
using System.Windows.Forms;
using Tncvd.Reflection;
using Tncvd.WinForms.AppExecution;
using Tncvd.WinForms.Logging;

namespace Tncvd.WinForms.Forms
{
    public partial class AppContainerForm : AppFormBase
    {
        #region Fields

        private const int DEFAULT_MENU_STRIP_HEIGHT_PX = 25;

        private readonly AppContainerInitializer _appContainerInitializer;

        private Form _appMainForm;

        private AppContainer _appContainer;
        private AppTextBoxLogger _logger;

        #endregion Fields

        #region Constructors
        public AppContainerForm()
        {
            this.InitializeComponent();
            this.InitForm();
        }

        public AppContainerForm(AppContainerInitializer appContainerInitializer)
        {
            this.InitializeComponent();
            this._appContainerInitializer = appContainerInitializer ?? throw new ArgumentNullException(nameof(appContainerInitializer));
            this.InitForm();
        }

        #endregion Constructors

        #region Properties

        #endregion Properties

        #region Methods

        public void SetAppMainForm(Form appMainForm)
        {
            this.AssureAppMainFormNotAssigned();
            this._appMainForm = appMainForm ?? throw new ArgumentNullException(nameof(appMainForm));
        }

        #region Methods - Init Form

        protected override void InitForm()
        {
            this.InitAppContainer();
            base.InitForm();
            this.SetupLayout();
        }

        private void InitAppContainer()
        {
            TextBoxLoggerFactory.Instance.RegisterDefaultLoggingRichTextBox(this.richTextBoxAppLogs);
            TextBoxLoggerFactory.Instance.RegisterDefaultOutputRichTextBox(this.richTextBoxOutput);
            this._appContainer = AppContainer.Instance;
            this._logger = TextBoxLoggerFactory.Instance.GetAppTextBoxLogger(this.GetType().GetTypeFullName());
            this.FormTabControl.SelectedTab = this.appLogsTabPage;
        }

        private void SetupLayout()
        {
            this.formSplitPannel.Panel1.ClientSize = new Size(this.formSplitPannel.Size.Width, DEFAULT_MENU_STRIP_HEIGHT_PX);
            this.formSplitPannel.SizeChanged += this.FormSplitContainer_SizeChanged;

            if (this._appContainerInitializer != null)
            {
                this._appContainerInitializer.AppContainerFormPropsAssigner(this);
            }
        }

        #endregion Methods - Init Form

        #region Methods - Validation

        private void AssureAppMainFormNotAssigned()
        {
            if (this._appMainForm != null)
            {
                throw new InvalidOperationException("The app main form is already assigned! Cannot assign the app main form twice!");
            }
        }

        #endregion Methods - Validation

        #region WinForm Controls Events

        private void FormSplitContainer_SizeChanged(object sender, EventArgs e)
        {
            this.formSplitPannel.Panel1.ClientSize = new Size(this.formSplitPannel.Size.Width, DEFAULT_MENU_STRIP_HEIGHT_PX);
        }

        private void AppContainerForm_Load(object sender, EventArgs e)
        {
            if (this._appContainerInitializer != null)
            {
                this._appMainForm = this._appContainerInitializer.MainAppFormCreator.Invoke();
                this._appMainForm.Show();
                this._appMainForm.BringToFront();
            }
        }

        #endregion WinForm Controls Events

        #endregion Methods
    }
}
