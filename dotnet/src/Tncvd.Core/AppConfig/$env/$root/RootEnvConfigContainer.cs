using System.IO;

namespace Tncvd.Core.AppConfig
{
    public class RootEnvConfigContainer : ConfigContainerBase<RootEnvConfig, RootEnvConfigSrlz>
    {
        private static RootEnvConfigContainer instance;

        private RootEnvConfigContainer()
        {
        }

        public static RootEnvConfigContainer Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new RootEnvConfigContainer();
                }

                return instance;
            }
        }

        protected override string ConfigFileName => "env-root.jsconfig.json";

        public string GetRootEnvRelPath(RootEnvDir rootEnvDir, params string[] relPathParts)
        {
            string rootEnvDirName = this.GetRootEnvDirName(rootEnvDir);
            string path = Path.Combine(relPathParts);

            path = Path.Combine(this.BasePath, rootEnvDirName, path);
            return path;
        }

        protected override string GetBasePath()
        {
            RootEnvPathRetriever rootEnvPathRetriever = new RootEnvPathRetriever();
            string basePath = rootEnvPathRetriever.GetRootEnvDirPath();

            return basePath;
        }

        private string GetRootEnvDirName(RootEnvDir rootEnvDir)
        {
            string rootEnvDirName = string.Empty;

            switch (rootEnvDir)
            {
                case RootEnvDir.Base:
                    rootEnvDirName = string.Empty;
                    break;
                case RootEnvDir.Dotnet:
                    rootEnvDirName = this.Config.DotnetRelDirPath;
                    break;
                case RootEnvDir.Content:
                    rootEnvDirName = this.Config.ContentRelDirPath;
                    break;
                case RootEnvDir.Nodejs:
                    rootEnvDirName = this.Config.NodejsRelDirPath;
                    break;
                case RootEnvDir.Python:
                    rootEnvDirName = this.Config.PythonRelDirPath;
                    break;
                case RootEnvDir.Powershell:
                    rootEnvDirName = this.Config.PowershellRelDirPath;
                    break;
                case RootEnvDir.DotnetLgc:
                    rootEnvDirName = this.Config.DotnetLgcRelDirPath;
                    break;
            }

            return rootEnvDirName;
        }
    }
}
