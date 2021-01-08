using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;
using Tncvd.Core.Collection;
using Tncvd.Logging.Logger;
using SimplePasswordTool.Services;

namespace SimplePasswordTool.Forms
{
    public partial class MainForm : Form
    {
        public const string ERROR_START_MESSAGE = "Something went wrong";
        public const string FATAL_ERROR_FINAL_MESSAGE = "The app will close after you press the ok button bellow.";
        public const string APP_DATA_CORRUPTED_MESSAGE = "and the app data got corrupted.";
        public const string TRY_AGAIN_MESSAGE = "Please try again.";

        private PasswordService passwordService;

        private FileLogger logger;
        private PasswordHelper passwordHelper;

        public MainForm()
        {
            this.InitializeComponent();
            this.InitForm();
        }

        private void InitForm()
        {
            this.InitLogger();
            this.InitService();

            this.InitServiceEvents();
            this.InitFormControls();
        }

        private void InitLogger()
        {
            this.logger = new FileLogger(this.GetType());
            this.logger.Verbose("App started");
        }

        private void InitService()
        {
            this.passwordService = new PasswordService();
            this.passwordHelper = new PasswordHelper();
        }

        private void InitFormControls()
        {
            this.passwordListUC.Visible = true;
            this.passwordListUC.Enabled = false;

            this.checkPasswordUC.Visible = false;
            this.checkPasswordUC.SetHelper(this.passwordHelper);

            this.createPasswordUC.Visible = false;
            this.createPasswordUC.SetHelper(this.passwordHelper);

            this.InitFormControlEvents();
        }

        private bool AssureBlankPasswordDataSingle(MessageBoxButtons messageBoxButtons, out DialogResult dialogResult, string errorMessage = null)
        {
            errorMessage = errorMessage ?? $"{ERROR_START_MESSAGE} {APP_DATA_CORRUPTED_MESSAGE} {TRY_AGAIN_MESSAGE}";

            bool retVal = this.passwordService.PasswordCollection.Count(item => item.IsBlank) == 1;
            dialogResult = DialogResult.None;

            if (retVal == false)
            {
                this.passwordService.PasswordCollection.DeleteWhere(item => item.IsBlank);
                this.passwordListUC.SetDataSource(this.passwordService.PasswordCollection);
                dialogResult = MessageBox.Show(errorMessage, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

            return retVal;
        }

        private void CloseApp(bool exitApp = true)
        {
            this.Close();
        }

        private void ShowErrorMessageOnStatusBar(string errorMessage = "The requested operation encountered an error and couldn't complete")
        {
            this.mainStatusStrip.Text = errorMessage;
        }

        private void ShowSuccessMessageOnStatusBar(string message = "The requested operation completed successfully")
        {
            this.mainStatusStrip.Text = message;
        }

        private void ShowLoadingMessageOnStatusBar(string message = "The request has been sent")
        {
            this.mainStatusStrip.Text = message;
        }

        #region Service Events

        private void InitServiceEvents()
        {
            this.passwordService.PasswordCollectionLoaded += this.PasswordCollectionLoaded;
            this.passwordService.PasswordCollectionLoadError += this.PasswordCollectionLoadedError;

            this.passwordService.PasswordSaved += this.PasswordSaved;
            this.passwordService.PasswordSaveError += this.PasswordSavedError;

            this.passwordService.PasswordOptionsLoaded += this.PasswordOptionsLoaded;
            this.passwordService.PasswordOptionsLoadError += this.PasswordOptionsLoadError;

            this.passwordService.PasswordOptionsSaved += this.PasswordOptionsSaved;
            this.passwordService.PasswordOptionsSaveError += this.PasswordOptionsSaveError;

            this.passwordService.PasswordCollectionOrderSaved += this.PasswordCollectionOrderSaved;
            this.passwordService.PasswordCollectionOrderSaveError += this.PasswordCollectionOrderSaveError;

            this.passwordService.PasswordDeleted += this.PasswordDeleted;
            this.passwordService.PasswordDeleteError += this.PasswordDeleteError;

            this.passwordService.PasswordValueDeleted += this.PasswordValueDeleted;
            this.passwordService.PasswordValueDeleteError += this.PasswordValueDeleteError;
        }

        private void PasswordValueDeleteError(AggregateException ex)
        {
            this.mainStatusStrip.Invoke(new Action<AggregateException>(err =>
            {
                this.ShowErrorMessageOnStatusBar();
            }), ex);
        }

        private void PasswordValueDeleted(PasswordData appModel)
        {
            this.mainStatusStrip.Invoke(new Action<PasswordData>(data =>
            {
                this.ShowSuccessMessageOnStatusBar();
            }), appModel);
        }

        private void PasswordDeleteError(AggregateException ex)
        {
            this.mainStatusStrip.Invoke(new Action<AggregateException>(err =>
            {
                this.ShowErrorMessageOnStatusBar();
            }), ex);
        }

        private void PasswordDeleted(PasswordData appModel)
        {
            this.passwordService.PasswordCollection.DeleteWhere(item => item.Id == appModel.Id);

            this.passwordListUC.Invoke(new Action<PasswordData>(data =>
            {
                this.passwordListUC.SetDataSource(this.passwordService.PasswordCollection);
            }), appModel);

            this.mainStatusStrip.Invoke(new Action<PasswordData>(data =>
            {
                this.ShowSuccessMessageOnStatusBar();
            }), appModel);
        }

        private void PasswordOptionsSaveError(AggregateException ex)
        {
            this.mainStatusStrip.Invoke(new Action<AggregateException>(err =>
            {
                this.ShowErrorMessageOnStatusBar();
            }), ex);
        }

        private void PasswordOptionsSaved(PasswordOptions appModel)
        {
            this.mainStatusStrip.Invoke(new Action<PasswordOptions>(data =>
            {
                this.ShowSuccessMessageOnStatusBar();
            }), appModel);
        }

        private void PasswordCollectionOrderSaveError(AggregateException ex)
        {
            this.mainStatusStrip.Invoke(new Action<AggregateException>(err =>
            {
                this.ShowErrorMessageOnStatusBar();
                this.logger.Error(ex, "Error while updating the password collection order.");
                // this.passwordListUC.EnableSaveOrder();
            }), ex);
        }

        private void PasswordCollectionOrderSaved()
        {
            this.mainStatusStrip.Invoke(new Action(() =>
            {
                this.ShowSuccessMessageOnStatusBar();
                // this.passwordListUC.EnableSaveOrder();
            }));
        }

        private void PasswordOptionsLoadError(AggregateException ex)
        {
            this.mainStatusStrip.Invoke(new Action<AggregateException>(err =>
            {
                this.ShowErrorMessageOnStatusBar();
                this.logger.Fatal(ex, "Error while saving the password");
                MessageBox.Show($"{ERROR_START_MESSAGE} and the password has not been saved. {FATAL_ERROR_FINAL_MESSAGE}", "Fatal Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                this.CloseApp();
            }), ex);
        }

        private void PasswordOptionsLoaded(PasswordOptions appModel)
        {
            this.mainStatusStrip.Invoke(new Action<PasswordOptions>(data =>
            {
                this.ShowSuccessMessageOnStatusBar();
            }), appModel);

            this.createPasswordUC.Invoke(new Action<PasswordOptions>(data =>
            {
                this.createPasswordUC.SetOptions(data);
            }), appModel);
        }

        private void PasswordSavedError(AggregateException ex)
        {
            this.mainStatusStrip.Invoke(new Action<AggregateException>(err =>
            {
                this.ShowErrorMessageOnStatusBar();
                this.logger.Error(ex, "Error while saving the password");
                MessageBox.Show($"{ERROR_START_MESSAGE} and the password has not been saved. {TRY_AGAIN_MESSAGE}", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }), ex);
        }

        private void PasswordSaved(PasswordData appModel)
        {
            this.passwordListUC.Invoke(new Action<PasswordData>(data =>
            {
                DialogResult dialogResult;

                if (this.AssureBlankPasswordDataSingle(MessageBoxButtons.OK, out dialogResult, $"{ERROR_START_MESSAGE} {APP_DATA_CORRUPTED_MESSAGE} {FATAL_ERROR_FINAL_MESSAGE}"))
                {
                    this.passwordService.PasswordCollection.ReplaceWhere((appModel, idx) => appModel.IsBlank, (appModel, idx) => data);
                    this.passwordListUC.SetDataSource(this.passwordService.PasswordCollection);
                }
                else
                {
                    this.CloseApp(dialogResult == DialogResult.OK);
                }
            }), appModel);
        }

        private void PasswordCollectionLoadedError(AggregateException ex)
        {
            this.Invoke(new Action<AggregateException>(err =>
            {
                this.ShowErrorMessageOnStatusBar();
                this.logger.Fatal(ex, "Error while loading app data");
                MessageBox.Show($"{ERROR_START_MESSAGE} and no data has been loaded. {FATAL_ERROR_FINAL_MESSAGE}", "Fatal error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                this.CloseApp();
            }), ex);
        }

        private void PasswordCollectionLoaded(List<PasswordData> appModel)
        {
            this.Invoke(new Action<List<PasswordData>>(data =>
            {
                this.passwordListUC.SetDataSource(data);
                this.passwordListUC.Enabled = true;

                this.checkPasswordUC.SetDataSource(data.Single(item => item.IsBlank));

                this.ShowSuccessMessageOnStatusBar();
            }), appModel);
        }

        #endregion Service Events

        #region UserControl Events

        private void InitFormControlEvents()
        {
            this.passwordListUC.PasswordItemChanged += this.PasswordItemChanged;
            this.passwordListUC.PasswordItemsOrderSave += this.PasswordItemsOrderSave;
            this.passwordListUC.PasswordItemDelete += this.PasswordItemDelete;

            this.createPasswordUC.UserCancelledForm += this.UserCancelledForm;
            this.createPasswordUC.UserSavedForm += this.UserSavedForm;
            this.createPasswordUC.PasswordOptionsSave += this.PasswordOptionsSave;

            this.checkPasswordUC.DeletePasswordValue += this.DeletePasswordValue;
        }

        private void DeletePasswordValue(PasswordData appModel)
        {
            this.passwordService.DeletePasswordValue(appModel);
            this.ShowLoadingMessageOnStatusBar();
        }

        private void PasswordItemDelete(PasswordData appModel)
        {
            this.passwordService.DeletePassword(appModel);
            this.ShowLoadingMessageOnStatusBar();
        }

        private void PasswordItemsOrderSave()
        {
            this.passwordService.UpdatePasswordCollectionOrder();
            this.ShowLoadingMessageOnStatusBar();
        }

        private void PasswordOptionsSave()
        {
            this.passwordService.SavePasswordOptions();
            this.ShowLoadingMessageOnStatusBar();
        }

        private void UserSavedForm(PasswordData appModel)
        {
            DialogResult dialogResult;

            if (this.AssureBlankPasswordDataSingle(MessageBoxButtons.OK, out dialogResult))
            {
                this.passwordService.SavePassword(appModel);
                this.ShowLoadingMessageOnStatusBar();
            }
        }

        private void UserCancelledForm()
        {
            this.createPasswordUC.Visible = false;
            this.passwordListUC.ClearListBoxSelection();
        }

        private void PasswordItemChanged(PasswordData data)
        {
            if (data?.IsBlank == false)
            {
                this.checkPasswordUC.SetDataSource(data);
            }
            else if (data?.IsBlank == true)
            {
                this.createPasswordUC.SetDataSource(data);
            }

            this.checkPasswordUC.Visible = (data?.IsBlank == false);
            this.createPasswordUC.Visible = (data?.IsBlank == true);
        }

        #endregion UserControl Events

        #region Control Events

        private void MainForm_Load(object sender, EventArgs e)
        {
            this.logger.Information("Loading app data");
            this.passwordService.LoadData();
            this.ShowLoadingMessageOnStatusBar();
        }

        private void pnlMainDefault_Click(object sender, EventArgs e)
        {
            this.passwordListUC.ClearListBoxSelection();
        }

        #endregion Control Events
    }
}
