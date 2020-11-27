using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Env;
using Tncvd.AppConfig.Env;
using Tncvd.AppConfig.Settings;

namespace Tncvd.Console.App
{
    internal class TestAppConfig
    {
        public void Run()
        {
            System.Console.WriteLine($"Root env path: {AppEnvConfigContainer.Instance.EnvRootPath}");
            System.Console.WriteLine($"Root env config path: {AppEnvConfigContainer.Instance.EnvRootConfigPath}");
            System.Console.WriteLine($"Root env content path: {AppEnvConfigContainer.Instance.EnvRootContentPath}");
            System.Console.WriteLine($"Root env data path: {AppEnvConfigContainer.Instance.EnvRootDataPath}");
            System.Console.WriteLine($"Root env logs path: {AppEnvConfigContainer.Instance.EnvRootLogsPath}");
            System.Console.WriteLine($"Root env metadata path: {AppEnvConfigContainer.Instance.EnvRootMetadataPath}");
            System.Console.WriteLine($"Root env temp path: {AppEnvConfigContainer.Instance.EnvRootTempPath}");
            System.Console.WriteLine($"Default app name prefix: {AppSettingsContainer.Instance.DefaultAppNamePrefix}");
        }
    }
}
