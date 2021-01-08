using System;
using System.IO;
using System.Reflection;
using Tncvd.Core.Reflection;

namespace Tncvd.Core.AppConfig
{
    public class EnvConfigContainer : ConfigContainerBase<EnvConfig, EnvConfigSrlz>
    {
        private static EnvConfigContainer instance;

        private EnvConfigContainer()
        {
        }

        public static EnvConfigContainer Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new EnvConfigContainer();
                }

                return instance;
            }
        }

        protected override string ConfigFileName => "env.jsconfig.json";

        public string GetEnvRelPath(EnvDir envDir, params string[] relPathParts)
        {
            string path = this.GetEnvRelPathCore(envDir, string.Empty, relPathParts);
            return path;
        }

        public string GetEnvRelPath(EnvDir envDir, Type type, params string[] relPathParts)
        {
            string typeDirName = type.GetTypeFullName();
            string path = this.GetEnvRelPathCore(envDir, typeDirName, relPathParts);

            return path;
        }

        public string GetEnvRelPath(EnvDir envDir, Assembly assembly, params string[] relPathParts)
        {
            string assemblyDirName = assembly.GetAssemblyFullName();
            string path = this.GetEnvRelPathCore(envDir, assemblyDirName, relPathParts);

            return path;
        }

        protected override string GetBasePath()
        {
            string basePath = RootEnvConfigContainer.Instance.GetRootEnvRelPath(RootEnvDir.Dotnet);
            return basePath;
        }

        private string GetEnvRelPathCore(EnvDir envDir, string mainRelPathPart, params string[] relPathParts)
        {
            string envDirName = this.GetEnvDirName(envDir);
            string path = Path.Combine(relPathParts);

            path = Path.Combine(this.BasePath, envDirName, mainRelPathPart, path);
            return path;
        }

        private string GetEnvDirName(EnvDir envDir)
        {
            string envDirName = string.Empty;

            switch (envDir)
            {
                case EnvDir.Base:
                    envDirName = string.Empty;
                    break;
                case EnvDir.Config:
                    envDirName = this.Config.ConfigRelDirPath;
                    break;
                case EnvDir.Data:
                    envDirName = this.Config.DataRelDirPath;
                    break;
                case EnvDir.Logs:
                    envDirName = this.Config.LogsRelDirPath;
                    break;
                case EnvDir.Metadata:
                    envDirName = this.Config.MetadataRelDirPath;
                    break;
                case EnvDir.Temp:
                    envDirName = this.Config.TempRelDirPath;
                    break;
            }

            return envDirName;
        }
    }
}
