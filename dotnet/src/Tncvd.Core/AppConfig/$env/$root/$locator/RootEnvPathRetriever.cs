using Tncvd.Core.FileSystem;
using Sz_Js_HpMt = Tncvd.Core.Serialization.HelperMethods;

namespace Tncvd.Core.AppConfig
{
    public class RootEnvLocator
    {
        public string EnvRootPath { get; set; }
        public bool UseMachineDefaultAppDataDir { get; set; }
        public string MachineAppDataEnvDirRelPath { get; set; }
    }

    public class RootEnvPathRetriever
    {
        public string GetRootEnvDirPath()
        {
            RootEnvLocator rootEnvLocator = Sz_Js_HpMt.DeserializeJson<RootEnvLocator>(
                this.GetEnvRootLocatorFilePath());

            return this.GetRootEnvDirPathFromLocator(rootEnvLocator);
        }

        private string GetRootEnvDirPathFromLocator(RootEnvLocator rootEnvLocator)
        {
            string rootEnvDirPath = rootEnvLocator.EnvRootPath.PathToMachineStyle();

            if (rootEnvLocator.UseMachineDefaultAppDataDir)
            {
                rootEnvDirPath = HelperMethods.GetMachineAppDataFolderPath(
                    rootEnvLocator.MachineAppDataEnvDirRelPath ?? Utils.ConstantValues.RootNamespacePascalCase);
            }

            return rootEnvDirPath;
        }

        private string GetEnvRootLocatorFilePath()
        {
            return "./env-root-locator.jsconfig.json";
        }
    }
}
