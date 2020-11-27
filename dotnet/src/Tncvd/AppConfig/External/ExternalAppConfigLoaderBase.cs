using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Env;

namespace Tncvd.AppConfig.External
{
    public abstract class ExternalAppConfigLoaderBase<T> : AppConfigLoaderBase<T> where T : ConfigurationSectionGroup
    {
        public const string DEFAULT_EXTERNAL_CONFIG_FILE_NAME = "tncvd.config";

        protected override Configuration LoadConfiguration()
        {
            Configuration retInstance;
            string configFilePath = this.GetConfigFilePath();

            retInstance = ConfigurationManager.OpenMappedMachineConfiguration(new ConfigurationFileMap
            {
                MachineConfigFilename = configFilePath
            });

            return retInstance;
        }

        private string GetConfigFilePath()
        {
            string retVal;
            string assemblyName = this.AssemblyName;

            retVal = Path.Combine(
                AppEnvConfigContainer.Instance.EnvRootConfigPath,
                assemblyName,
                DEFAULT_EXTERNAL_CONFIG_FILE_NAME);

            return retVal;
        }
    }
}
