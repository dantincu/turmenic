using Microsoft.Extensions.Configuration;

namespace Tncvd.AppSettings.SettingsLoader
{
    public static class HelperMethods
    {
        public const string APP_SETTINGS_ENV_LOCATION_PATH_KEY = "tncvdEnvLocationPath";

        public static string GetAppEnvRootPath<TAppEnvSettingsLoader>() where TAppEnvSettingsLoader : AppEnvSettingsLoaderBase, new()
        {
            IConfigurationRoot appSettings = new TAppEnvSettingsLoader().GetAppSettings();

            string envRootPath = appSettings.GetSection(APP_SETTINGS_ENV_LOCATION_PATH_KEY).Value;
            return envRootPath;
        }
    }
}
