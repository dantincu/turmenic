using System.Configuration;
using Tncvd.AppConfig.Env;
using Tncvd.Components;

namespace Tncvd.AppConfig.Execution
{
    public class AppExecutionInfoRegistrarBase<TAppExecutionInfoRegistrar> : InstanceContainer<TAppExecutionInfoRegistrar> where TAppExecutionInfoRegistrar : new()
    {
        public virtual void Register()
        {
            string tncvdEnvLocationPath = ConfigurationManager.AppSettings[AppEnvConfigContainer.APP_CONFIG_ENV_LOCATION_PATH_KEY];
            this.RegisterAppExecutionInfo(tncvdEnvLocationPath);
        }

        protected virtual void RegisterAppExecutionInfo(string tncvdEnvLocationPath)
        {
            AppExecutionInfo appExecutionInfo = this.GetAppExecutionInfo(tncvdEnvLocationPath);
            AppExecutionInfoContainer.Instance.Register(appExecutionInfo);

            AppEnvConfigContainer.SetEnvRootPath(tncvdEnvLocationPath);
        }

        protected virtual AppExecutionInfo GetAppExecutionInfo(string tncvdEnvLocationPath)
        {
            AppExecutionInfo appExecutionInfo = new AppExecutionInfo(
                this.GetType().Assembly,
                tncvdEnvLocationPath);

            return appExecutionInfo;
        }
    }
}
