namespace Tncvd.AppConfig
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;
    using Tncvd.AppConfig.Config;
    using Tncvd.AppConfig.Config.Env;

    public class AppEnvConfigContainer : AppEnvConfigContainerBase<TncvdSectionGroup, AppConfigLoader>
    {
        private static AppEnvConfigContainer _instance;

        private EnvLocationElement[] _envLocationElements;

        private EnvLocationElement _defaultEnvLocationElement;

        private AppEnvConfigContainer()
        {
            this._envLocationElements = this.GetEnvLocationElements();
            this._defaultEnvLocationElement = this._envLocationElements?.SingleOrDefault();
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

        public string EnvRootPath
        {
            get
            {
                return this._defaultEnvLocationElement?.Path;
            }
        }

        public string EnvRootConfigPath
        {
            get
            {
                return this.GetCombinedPath(this._defaultEnvLocationElement?.Path, this._defaultEnvLocationElement?.ConfigDir);
            }
        }

        public string EnvRootLogsPath
        {
            get
            {
                return this.GetCombinedPath(this._defaultEnvLocationElement?.Path, this._defaultEnvLocationElement?.LogsDir);
            }
        }

        public string EnvRootDataPath
        {
            get
            {
                return this.GetCombinedPath(this._defaultEnvLocationElement?.Path, this._defaultEnvLocationElement?.DataDir);
            }
        }

        public string EnvRootContentPath
        {
            get
            {
                return this.GetCombinedPath(this._defaultEnvLocationElement?.Path, this._defaultEnvLocationElement?.ContentDir);
            }
        }

        public string EnvRootMetadataPath
        {
            get
            {
                return this.GetCombinedPath(this._defaultEnvLocationElement?.Path, this._defaultEnvLocationElement?.MetadataDir);
            }
        }

        public string EnvRootTempPath
        {
            get
            {
                return this.GetCombinedPath(this._defaultEnvLocationElement?.Path, this._defaultEnvLocationElement?.TempDir);
            }
        }

        private EnvLocationElement[] GetEnvLocationElements()
        {
            EnvLocationElement[] retInstance = null;
            EnvLocationElementCollection collection = this.SectionGroup?.EnvSection?.Locations;
            if (collection != null)
            {
                retInstance = new EnvLocationElement[collection.Count];
                collection.CopyTo(this._envLocationElements, 0);
            }

            return retInstance;
        }

        private string GetCombinedPath(string basePath, string dirName)
        {
            string retVal = string.Empty;
            if (string.IsNullOrWhiteSpace(basePath) == false && string.IsNullOrWhiteSpace(dirName) == false)
            {
                retVal = Path.Combine(basePath, dirName);
            }
            return retVal;
        }
    }
}
