using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Text;
using Tncvd.AppConfig.Env;

namespace Tncvd.AppConfig
{
    public abstract class ConfigFileLoaderBase
    {
        public const string ENV_CONFIG_FILE_NAME_SUFFIX = "env";

        public virtual Configuration LoadConfiguration()
        {
            Configuration retInstance;
            string configFilePath = this.GetConfigFilePath();

            retInstance = ConfigurationManager.OpenMappedMachineConfiguration(new ConfigurationFileMap
            {
                MachineConfigFilename = configFilePath
            });

            return retInstance;
        }

        protected abstract string GetConfigFilePath();

        protected string GetDefaultExternalConfigFileName()
        {
            string externalConfigFileName = FileSystem.HelperMethods.GetFileName(
                Tncvd.Utility.ConstantValues.RootNamespaceCamelCase,
                FileSystem.ConstantValues.CommonFileExtensions.CONFIG);

            return externalConfigFileName;
        }
    }
}
