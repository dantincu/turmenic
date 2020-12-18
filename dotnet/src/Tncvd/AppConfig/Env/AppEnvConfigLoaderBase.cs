using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Env
{
    public abstract class AppEnvConfigLoaderBase<T> : AppConfigLoaderBase<T> where T : ConfigurationSectionGroup
    {
        public const string EXECUTABLE_FILE_EXTENSION_NAME = "exe";
        public const string LIBRARY_FILE_EXTENSION_NAME = "dll";
        public const string CONFIG_FILE_EXTENSION_NAME = "config";

        protected abstract bool AssemblyIsExecutable { get; }

        protected override Configuration LoadConfiguration()
        {
            Configuration retInstance;
            string configFileName = this.GetConfigFileName();

            retInstance = ConfigurationManager.OpenMappedExeConfiguration(
                new ExeConfigurationFileMap
            {
                ExeConfigFilename = configFileName
            },
            ConfigurationUserLevel.None);

            return retInstance;
        }

        private string GetConfigFileName()
        {
            string retVal = this.AssemblyName;

            if (this.AssemblyIsExecutable)
            {
                retVal = $"{retVal}.{EXECUTABLE_FILE_EXTENSION_NAME}";
            }
            else
            {
                retVal = $"{retVal}.{LIBRARY_FILE_EXTENSION_NAME}";
            }

            retVal = $"{retVal}.{CONFIG_FILE_EXTENSION_NAME}";

            return retVal;
        }
    }
}
