using System;
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

        private string GetRootEnvDirName(RootEnvDir rootEnvDir) =>
            rootEnvDir switch
            {
                RootEnvDir.Base => string.Empty,
                RootEnvDir.Dotnet => this.Config.DotnetRelDirPath,
                RootEnvDir.Content => this.Config.ContentRelDirPath,
                RootEnvDir.Nodejs => this.Config.NodejsRelDirPath,
                RootEnvDir.Python => this.Config.PythonRelDirPath,
                RootEnvDir.Powershell => this.Config.PowershellRelDirPath,
                RootEnvDir.DotnetLgc => this.Config.DotnetLgcRelDirPath,
                _ => throw new ArgumentException(nameof(rootEnvDir))
            };
    }
}
