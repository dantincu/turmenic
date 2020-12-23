using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppSettings.SettingsLoader
{
    public abstract class AppEnvSettingsLoaderBase : AppSettingsLoaderBase
    {
        public string DEFAULT_APP_SETTINGS_FILE_NAME = "appsettings.json";

        protected override string GetAppSettingsFilePath()
        {
            return DEFAULT_APP_SETTINGS_FILE_NAME;
        }
    }
}
