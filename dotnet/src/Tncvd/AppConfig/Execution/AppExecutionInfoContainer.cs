using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Env;

namespace Tncvd.AppConfig.Execution
{
    public class AppExecutionInfoContainer
    {
        private static AppExecutionInfoContainer _instance;

        private AppExecutionInfoBase _info;

        private AppExecutionInfoContainer()
        {
        }

        public static AppExecutionInfoContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AppExecutionInfoContainer();
                }

                return _instance;
            }
        }

        public AppExecutionInfoBase Info
        {
            get
            {
                this.AssureRegistered();

                return this._info;
            }
        }

        public void Register(AppExecutionInfoBase info)
        {
            this.AssureNotRegistered();

            this._info = info;
            this.TryWriteInfoToFile(info);
        }

        public void Register<T>() where T : AppExecutionInfoBase
        {
            T info = Activator.CreateInstance<T>();
            this.Register(info);
        }

        private void TryWriteInfoToFile(AppExecutionInfoBase info)
        {
            try
            {
                info.WriteInfoToFile(
                    AppEnvConfigContainer.Instance.GetEnvMetadataPath(info.AppExecutionStartAssemblyName),
                    this.GetOutputFileName(info));
            }
            catch
            {
            }
        }

        private string GetOutputFileName(AppExecutionInfoBase info)
        {
            string outputFileName = FileSystem.HelperMethods.GetSlugFileNameFromSegments(
                FileSystem.ConstantValues.CommonFileExtensions.XML,
                "app",
                "info",
                info.AppExecutionStartTimeTicks.ToString(),
                info.AppExecutionId.ToString());

            return outputFileName;
        }

        private void AssureNotRegistered()
        {
            if (this._info != null)
            {
                throw new InvalidOperationException("The application execution info has already been registered! It cannot be registered twice!");
            }
        }

        private void AssureRegistered()
        {
            if (this._info == null)
            {
                throw new InvalidOperationException("The application execution info has not yet been registered!");
            }
        }
    }
}
