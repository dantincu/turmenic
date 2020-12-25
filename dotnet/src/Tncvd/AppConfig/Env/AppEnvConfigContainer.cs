using System;
using System.Configuration;
using Tncvd.AppConfig.Config.Env;
using Tncvd.AppConfig.Env.Data;

namespace Tncvd.AppConfig.Env
{
    public partial class AppEnvConfigContainer
    {
        public static readonly string AppConfigEnvSectionsGroupKey = Tncvd.Utility.ConstantValues.RootNamespaceCamelCase + "Env";
        public static readonly string AppConfigEnvLocationPathKey = AppConfigEnvSectionsGroupKey + "LocationPath";
        
        private static AppEnvConfigContainer _instance;
        private static string _envRootPathValue;

        private string _envRootPath;

        private AppEnvConfigContainer()
        {
            this._envRootPath = _envRootPathValue;

            Configuration configuration = this.LoadConfiguration();
            this.InitEnvDirNames(configuration);
        }

        public static AppEnvConfigContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AppEnvConfigContainer();
                }

                return _instance;
            }
        }

        public string EnvRootPath => this._envRootPath;

        public EnvDirNames EnvDirNames { get; private set; }

        public static void SetEnvRootPath(string envRootPath)
        {
            if (_instance == null)
            {
                _envRootPathValue = envRootPath;
                _instance = new AppEnvConfigContainer();
            }
            else
            {
                throw new InvalidOperationException("Could not set the env root path after the app env config container has been instantiated!");
            }
        }

        private Configuration LoadConfiguration()
        {
            Configuration configuration;

            EnvConfigFileLoader envConfigFileLoader = new EnvConfigFileLoader(this._envRootPath);
            configuration = envConfigFileLoader.LoadConfiguration();
            return configuration;
        }

        private void InitEnvDirNames(Configuration configuration)
        {
            EnvSectionGroup sectionGroup = configuration.SectionGroups[AppConfigEnvSectionsGroupKey] as EnvSectionGroup;
            EnvDirsSection section = sectionGroup.EnvDirsSection;

            this.EnvDirNames = new EnvDirNames(section.DirNames);
        }
    }
}
