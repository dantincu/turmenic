using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Env;
using Tncvd.AppConfig.Execution;

namespace Tncvd.AppConfig.Env
{
    public class AppEnvConfigContainer : AppConfigContainerBase<TncvdEnvLocationsSectionGroup, AppEnvConfigLoader>
    {
        private static AppEnvConfigContainer _instance;

        private EnvLocationElement[] _envLocationElements;
        private EnvLocationElement _tncvdEnvLocationElement;

        private AppEnvConfigContainer()
        {
            this._envLocationElements = this.GetEnvLocationElements();
            this._tncvdEnvLocationElement = this.GetLocationElement(this._envLocationElements);
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
                return this._tncvdEnvLocationElement?.Path;
            }
        }

        public string EnvRootConfigPath
        {
            get
            {
                return this.GetCombinedPath(this._tncvdEnvLocationElement?.Path, this._tncvdEnvLocationElement?.ConfigDir);
            }
        }

        public string EnvRootLogsPath
        {
            get
            {
                return this.GetCombinedPath(this._tncvdEnvLocationElement?.Path, this._tncvdEnvLocationElement?.LogsDir);
            }
        }

        public string EnvRootDataPath
        {
            get
            {
                return this.GetCombinedPath(this._tncvdEnvLocationElement?.Path, this._tncvdEnvLocationElement?.DataDir);
            }
        }

        public string EnvRootContentPath
        {
            get
            {
                return this.GetCombinedPath(this._tncvdEnvLocationElement?.Path, this._tncvdEnvLocationElement?.ContentDir);
            }
        }

        public string EnvRootMetadataPath
        {
            get
            {
                return this.GetCombinedPath(this._tncvdEnvLocationElement?.Path, this._tncvdEnvLocationElement?.MetadataDir);
            }
        }

        public string EnvRootTempPath
        {
            get
            {
                return this.GetCombinedPath(this._tncvdEnvLocationElement?.Path, this._tncvdEnvLocationElement?.TempDir);
            }
        }

        public string GetEnvRelativePath(string rootEnvDirName, string relativeEnvDirName)
        {
            string retVal = Path.Combine(
                this.EnvRootPath,
                rootEnvDirName,
                relativeEnvDirName);

            return retVal;
        }

        public string GetEnvConfigPath(string relativeEnvDirName)
        {
            string retVal = Path.Combine(
                this.EnvRootConfigPath,
                relativeEnvDirName);

            return retVal;
        }

        public string GetEnvLogsPath(string relativeEnvDirName)
        {
            string retVal = Path.Combine(
                this.EnvRootLogsPath,
                relativeEnvDirName);

            return retVal;
        }

        public string GetEnvDataPath(string relativeEnvDirName)
        {
            string retVal = Path.Combine(
                this.EnvRootDataPath,
                relativeEnvDirName);

            return retVal;
        }

        public string GetEnvContentPath(string relativeEnvDirName)
        {
            string retVal = Path.Combine(
                this.EnvRootContentPath,
                relativeEnvDirName);

            return retVal;
        }

        public string GetEnvMetadataPath(string relativeEnvDirName)
        {
            string retVal = Path.Combine(
                this.EnvRootMetadataPath,
                relativeEnvDirName);

            return retVal;
        }

        public string GetEnvTempPath(string relativeEnvDirName)
        {
            string retVal = Path.Combine(
                this.EnvRootTempPath,
                relativeEnvDirName);

            return retVal;
        }

        private EnvLocationElement[] GetEnvLocationElements()
        {
            EnvLocationElement[] retInstance = null;
            EnvLocationElementCollection collection = this.SectionGroup?.EnvSection?.Locations;
            if (collection != null)
            {
                retInstance = new EnvLocationElement[collection.Count];
                collection.CopyTo(retInstance, 0);
            }

            return retInstance;
        }

        private EnvLocationElement GetLocationElement(EnvLocationElement[] collection)
        {
            EnvLocationElement retInstance;
            string locationName = this.GetLocationName();

            retInstance = collection.SingleOrDefault(x => x.Name == locationName);
            return retInstance;
        }

        private string GetLocationName()
        {
            string retValue = AppExecutionInfoContainer.Instance.Info.TncvdEnvLocationName;
            return retValue;
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
