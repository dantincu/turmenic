using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace Tncvd.AppSettings.SettingsLoader
{
    public abstract class AppSettingsLoaderBase
    {
        public virtual IConfigurationRoot GetAppSettings()
        {
            string appSettingsFilePath = this.GetAppSettingsFilePath();

            ConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            configurationBuilder.Add(this.GetJsonConfigurationSource(appSettingsFilePath));

            IConfigurationRoot configurationRoot = configurationBuilder.Build();
            return configurationRoot;
        }

        protected abstract string GetAppSettingsFilePath();

        private JsonConfigurationSource GetJsonConfigurationSource(string appSettingsFilePath)
        {
            JsonConfigurationSource jsonConfigurationSource = new JsonConfigurationSource()
            {
                Path = appSettingsFilePath
            };

            return jsonConfigurationSource;
        }
    }
}
