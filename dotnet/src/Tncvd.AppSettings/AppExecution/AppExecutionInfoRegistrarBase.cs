using Tncvd.AppSettings.Container;
using Tncvd.AppSettings.SettingsLoader;

namespace Tncvd.AppSettings.AppExecution
{
    public class AppExecutionInfoRegistrarBase<TAppExecutionInfoRegistrar, TAppEnvSettingsLoader> : AppConfig.Execution.AppExecutionInfoRegistrarBase<TAppExecutionInfoRegistrar>
        where TAppExecutionInfoRegistrar : new() where TAppEnvSettingsLoader : AppEnvSettingsLoaderBase, new()
    {
        public override void Register()
        {
            string tncvdEnvLocationPath = HelperMethods.GetAppEnvRootPath<TAppEnvSettingsLoader>();
            this.RegisterAppExecutionInfo(tncvdEnvLocationPath);
        }
    }
}
