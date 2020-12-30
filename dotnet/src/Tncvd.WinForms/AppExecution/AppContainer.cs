using System;
using Tncvd.Reflection;
using Tncvd.Services;
using Tncvd.Utility;
using Tncvd.WinForms.Forms.AppContainerWindow;
using Tncvd.WinForms.Forms.AppMainWindow.Base;
using Tncvd.WinForms.Logging;

namespace Tncvd.WinForms.AppExecution
{
    public class AppContainer
    {
        private const string OUTPUT_TEXTBOX_LOGGER_NAME = "APP OUTPUT";

        private static AppContainer _instance;

        private AppContainerWindowForm _appContainerWindow;
        private AppMainWindowFormBase _appMainWindow;

        private AppContainer()
        {
            this.AppTextBoxLogger = TextBoxLoggerFactory.Instance.GetAppTextBoxLogger(GetType().GetTypeFullName());
            this.OutputTextBoxLogger = TextBoxLoggerFactory.Instance.GetOutputTextBoxLogger(OUTPUT_TEXTBOX_LOGGER_NAME);
        }

        public static AppContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AppContainer();
                }

                return _instance;
            }
        }

        public AppTextBoxLogger OutputTextBoxLogger { get; }

        public AppTextBoxLogger AppTextBoxLogger { get; }

        public void AssignAppMainForm(AppMainWindowFormBase appMainWindow)
        {
            this._appMainWindow = this.AssureAppMainFormNotAssigned(appMainWindow ?? throw new ArgumentNullException(nameof(appMainWindow)));
        }

        public void AssignAppContainerForm(AppContainerWindowForm appContainerWindow)
        {
            this._appContainerWindow = this.AssureAppContainerFormNotAssigned(appContainerWindow ?? throw new ArgumentNullException(nameof(appContainerWindow)));
        }

        public ActionResponse RunAction(Func<ActionResponse> action, AppTextBoxLogger appTextBoxLogger, string actionName = "action")
        {
            ActionResponse response = action.Invoke();

            if (response != null && response.Success)
            {
                appTextBoxLogger.ShowSuccessMessage($"The {actionName} has completed and returned a success message.");
            }
            else if (response != null && string.IsNullOrWhiteSpace(response.ErrorMessage) == false)
            {
                appTextBoxLogger.ShowErrorMessage($"The {actionName} returned the following error message: {response.ErrorMessage}.");
            }
            else
            {
                appTextBoxLogger.ShowErrorMessage($"Something went wrong and the {actionName} did not return a valid response.");
            }

            return response;
        }

        public ActionResponse<TData> RunAction<TData>(Func<ActionResponse<TData>> action, AppTextBoxLogger appTextBoxLogger, string actionName = "action", bool printResultDataToOutput = false)
        {
            OutputTextBoxLogger.Clear();

            Func<ActionResponse> unTypedAction = action;
            ActionResponse<TData> response = RunAction(unTypedAction, appTextBoxLogger, actionName) as ActionResponse<TData>;

            if (printResultDataToOutput && response != null && response.Data != null)
            {
                OutputTextBoxLogger.Information($"Outputting string representation for object of type {typeof(TData).GetTypeFullName()}:");
                string objectString = SerializationHelperMethods.ObjectToStringOrXml(response.Data);
                OutputTextBoxLogger.Information(objectString);
            }

            return response;
        }

        private AppMainWindowFormBase AssureAppMainFormNotAssigned(AppMainWindowFormBase appMainWindow)
        {
            if (this._appMainWindow != null)
            {
                throw new InvalidOperationException("The app main form can only be assigned once!");
            }

            return appMainWindow;
        }

        private AppContainerWindowForm AssureAppContainerFormNotAssigned(AppContainerWindowForm appContainerWindow)
        {
            if (this._appContainerWindow != null)
            {
                throw new InvalidOperationException("The app container form can only be assigned once!");
            }

            return appContainerWindow;
        }
    }
}
