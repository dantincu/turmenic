using System.IO;

namespace Tncvd.AppConfig
{
    public class EnvConfigFileLoader : ConfigFileLoaderBase
    {
        public EnvConfigFileLoader(string EnvDirPath)
        {
            this.EnvDirPath = EnvDirPath;
        }

        protected string EnvDirPath { get; }

        protected override string GetConfigFilePath()
        {
            string retVal = Path.Combine(
                this.EnvDirPath,
                this.GetDefaultEnvConfigFileName());

            return retVal;
        }

        protected string GetDefaultEnvConfigFileName()
        {
            string envConfigFileName = FileSystem.HelperMethods.GetFileName(
                Tncvd.Utility.ConstantValues.RootNamespaceCamelCase,
                ENV_CONFIG_FILE_NAME_SUFFIX,
                FileSystem.ConstantValues.CommonFileExtensions.CONFIG);

            return envConfigFileName;
        }
    }
}
