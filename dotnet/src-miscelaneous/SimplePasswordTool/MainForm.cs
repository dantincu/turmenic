using Logging;
using SimplePasswordTool.Services;
using System;
using System.Windows.Forms;

namespace SimplePasswordTool
{
    public partial class MainForm : Form
    {
        private readonly PasswordService _passwordService;

        private SimpleFileLogger _logger;
        private PasswordHelper _passwordHelper;

        public MainForm()
        {
            this.InitializeComponent();

            this._logger = new SimpleFileLogger(this.GetType());
            this._logger.Verbose("App started");

            this._passwordService = new PasswordService();

            this.InitFormControls();
        }

        private void InitFormControls()
        {
            this.passwordListUC.Enabled = false;
            this.passwordListUC.OnPasswordItemChanged += this.passwordListUC_OnPasswordItemChanged;

            this.checkPasswordUC.Visible = false;
            this.createPasswordUC.Visible = false;
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            this._logger.Information("Loading app data");

            try
            {
                this._passwordService.LoadData();
                this._passwordHelper = new PasswordHelper(this._passwordService.PasswordOptions);

                this.checkPasswordUC.SetHelper(this._passwordHelper);
                this.createPasswordUC.SetHelper(this._passwordHelper);

                this.passwordListUC.SetDataSource(this._passwordService.PasswordCollection);
                this.passwordListUC.Enabled = true;
            }
            catch (Exception ex)
            {
                this._logger.Fatal(ex, "Error while loading app data");
                MessageBox.Show("Something went wrong and no data has been loaded.", "Fatal error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                this.Close();
            }
        }

        private void passwordListUC_OnPasswordItemChanged(PasswordData data)
        {
            this.checkPasswordUC.SetDataSource(data);
        }
    }
}
