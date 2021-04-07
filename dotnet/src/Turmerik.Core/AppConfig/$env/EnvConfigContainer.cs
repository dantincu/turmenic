using System;
using System.IO;
using System.Reflection;
using Turmerik.Core.Reflection;

namespace Turmerik.Core.AppConfig
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

        private string GetEnvDirName(EnvDir envDir) =>
            envDir switch
            {
                EnvDir.Base => string.Empty,
                EnvDir.Config => this.Config.ConfigRelDirPath,
                EnvDir.Data => this.Config.DataRelDirPath,
                EnvDir.Logs => this.Config.LogsRelDirPath,
                EnvDir.Metadata => this.Config.MetadataRelDirPath,
                EnvDir.Temp => this.Config.TempRelDirPath,
                _ => throw new ArgumentException(nameof(envDir))
            };
    }
}
