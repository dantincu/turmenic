using Tncvd.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.Utility;
using Tncvd.WinForms.Logging;

namespace Tncvd.WinForms.AppContainer.Forms
{
    public class AppContainer
    {
        private static AppContainer _instance;

        private AppTextBoxLogger _logger;

        private AppContainer()
        {
            _logger = TextBoxLoggerFactory.Instance.GetAppTextBoxLogger(GetType().FullName);
            OutputLogger = TextBoxLoggerFactory.Instance.GetOutputTextBoxLogger("APP OUTPUT");
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

        public AppTextBoxLogger OutputLogger { get; }

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
            OutputLogger.Clear();

            Func<ActionResponse> unTypedAction = action;
            ActionResponse<TData> response = RunAction(unTypedAction, appTextBoxLogger, actionName) as ActionResponse<TData>;

            if (printResultDataToOutput && response != null && response.Data != null)
            {
                OutputLogger.Information($"Outputting string representation for object of type {typeof(TData).FullName}:");
                string objectString = SerializationHelperMethods.ObjectToStringOrXml(response.Data);
                OutputLogger.Information(objectString);
            }

            return response;
        }
    }
}
