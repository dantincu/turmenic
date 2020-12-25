using Microsoft.Extensions.Configuration;

namespace Tncvd.AppSettings.SettingsLoader
{
    public static class HelperMethods
    {
        public static readonly string AppSettingsEnvLocationPathKey = AppConfig.Env.AppEnvConfigContainer.AppConfigEnvLocationPathKey;

        public static string GetAppEnvRootPath<TAppEnvSettingsLoader>() where TAppEnvSettingsLoader : AppEnvSettingsLoaderBase, new()
        {
            IConfigurationRoot appSettings = new TAppEnvSettingsLoader().GetAppSettings();

            string envRootPath = appSettings.GetSection(AppSettingsEnvLocationPathKey).Value;
            return envRootPath;
        }
    }
}
