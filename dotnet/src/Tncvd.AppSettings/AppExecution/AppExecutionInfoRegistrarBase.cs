using Tncvd.AppSettings.Container;
using Tncvd.AppSettings.SettingsLoader;

namespace Tncvd.AppSettings.AppExecution
{
    public class AppExecutionInfoRegistrarBase<TAppEnvSettingsLoader> : AppConfig.Execution.AppExecutionInfoRegistrarBase
        where TAppEnvSettingsLoader : AppEnvSettingsLoaderBase, new()
    {
        public override void Register()
        {
            string tncvdEnvLocationPath = HelperMethods.GetAppEnvRootPath<TAppEnvSettingsLoader>();
            this.RegisterAppExecutionInfo(tncvdEnvLocationPath);
        }
    }
}
