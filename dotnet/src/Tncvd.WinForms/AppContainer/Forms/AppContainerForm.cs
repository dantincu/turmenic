using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Tncvd.WinForms.UserControls.Forms;
using Tncvd.WinForms.Logging;
using Tncvd.WinForms.UserControls.Utility;

namespace Tncvd.WinForms.AppContainer.Forms
{
    public partial class AppContainerForm : Form
    {
        #region Fields

        private const int DEFAULT_MENU_STRIP_HEIGHT_PX = 25;

        private readonly Func<Form> _appMainFormCreator;

        private Form _appMainForm;

        private AppContainer _appContainer;
        private AppTextBoxLogger _logger;

        #endregion Fields

        #region Constructors
        public AppContainerForm()
        {
            InitializeComponent();
            this.InitForm();
        }

        public AppContainerForm(Func<Form> appMainFormCreator)
        {
            InitializeComponent();
            this._appMainFormCreator = appMainFormCreator;
            this.InitForm();
        }

        #endregion Constructors

        #region Properties

        #endregion Properties

        #region Methods

        #region Methods - Init Form

        private void InitForm()
        {
            this.InitAppContainer();
            this.SetupLayout();
        }

        private void InitAppContainer()
        {
            TextBoxLoggerFactory.Instance.RegisterDefaultLoggingRichTextBox(this.richTextBoxAppLogs);
            TextBoxLoggerFactory.Instance.RegisterDefaultOutputRichTextBox(this.richTextBoxOutput);
            this._appContainer = AppContainer.Instance;
            this._logger = TextBoxLoggerFactory.Instance.GetAppTextBoxLogger(this.GetType().FullName);
            this.FormTabControl.SelectedTab = this.appLogsTabPage;
        }

        private void SetupLayout()
        {
            this.formSplitPannel.Panel1.ClientSize = new Size(this.formSplitPannel.Size.Width, DEFAULT_MENU_STRIP_HEIGHT_PX);
            this.formSplitPannel.SizeChanged += FormSplitContainer_SizeChanged;

            HelperMethods.AddRichTextBoxProperties(this.richTextBoxAppLogs);
        }

        #endregion Methods - Init Form

        #region WinForm Controls Events

        private void FormSplitContainer_SizeChanged(object sender, EventArgs e)
        {
            this.formSplitPannel.Panel1.ClientSize = new Size(this.formSplitPannel.Size.Width, DEFAULT_MENU_STRIP_HEIGHT_PX);
        }

        #endregion WinForm Controls Events

        #endregion Methods

        private void AppContainerForm_Load(object sender, EventArgs e)
        {
            this._appMainForm = this._appMainFormCreator.Invoke();
            this._appMainForm.Show();
            this._appMainForm.BringToFront();
        }
    }
}
