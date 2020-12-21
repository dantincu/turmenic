using System;
using System.Configuration;
using System.IO;
using System.Reflection;
using Tncvd.AppConfig.Config.Env;
using Tncvd.AppConfig.Config.Settings.Simple;
using Tncvd.AppConfig.Env.Data;
using Tncvd.Collections;
using Tncvd.Components;

namespace Tncvd.AppConfig.Env
{
    public partial class AppEnvConfigContainer : InstanceContainer<AppEnvConfigContainer>
    {
        public const string APP_CONFIG_ENV_LOCATION_PATH_KEY = "tncvdEnvLocationPath";
        public const string APP_CONFIG_ENV_SECTIONS_GROUP_KEY = "tncvdEnv";

        private readonly string _envRootPath = ConfigurationManager.AppSettings[APP_CONFIG_ENV_LOCATION_PATH_KEY];

        public AppEnvConfigContainer()
        {
            Configuration configuration = this.LoadConfiguration();
            this.InitEnvDirNames(configuration);
        }

        public string EnvRootPath => this._envRootPath;

        public EnvDirNames EnvDirNames { get; private set; }

        private Configuration LoadConfiguration()
        {
            Configuration configuration;

            EnvConfigFileLoader envConfigFileLoader = new EnvConfigFileLoader(this._envRootPath);
            configuration = envConfigFileLoader.LoadConfiguration();
            return configuration;
        }

        private void InitEnvDirNames(Configuration configuration)
        {
            EnvSectionGroup sectionGroup = configuration.SectionGroups[APP_CONFIG_ENV_SECTIONS_GROUP_KEY] as EnvSectionGroup;
            EnvDirsSection section = sectionGroup.EnvDirsSection;

            this.EnvDirNames = new EnvDirNames(section.DirNames);
        }
    }
}
