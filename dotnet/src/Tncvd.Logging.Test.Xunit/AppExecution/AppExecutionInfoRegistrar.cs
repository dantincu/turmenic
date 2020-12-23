using Tncvd.AppSettings.AppExecution;
using Tncvd.AppSettings.SettingsLoader;

namespace Tncvd.Logging.Test.Xunit.AppExecution
{
    public class AppExecutionInfoRegistrar : AppExecutionInfoRegistrarBase<AppExecutionInfoRegistrar, AppEnvSettingsLoader>
    {
    }

    public class AppEnvSettingsLoader : AppEnvSettingsLoaderBase
    {
    }
}
