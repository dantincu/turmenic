using Microsoft.Extensions.Configuration;
using Tncvd.AppSettings.SettingsLoader;
using Tncvd.Components;

namespace Tncvd.AppSettings.Container
{
    public abstract class AppSettingsContainerBase<TAppSettingsContainer, TAppSettingsLoader> : InstanceContainer<TAppSettingsContainer> where TAppSettingsLoader : AppSettingsLoaderBase, new() where TAppSettingsContainer : new()
    {
        public AppSettingsContainerBase()
        {
            IConfigurationRoot appSettings = this.LoadAppSettings();
            this.InitContainerProperties(appSettings);
        }

        protected abstract void InitContainerProperties(IConfigurationRoot appSettings);

        private IConfigurationRoot LoadAppSettings()
        {
            IConfigurationRoot appSettings = null;

            TAppSettingsLoader appSettingsLoader = new TAppSettingsLoader();
            appSettings = appSettingsLoader.GetAppSettings();

            return appSettings;
        }
    }
}
