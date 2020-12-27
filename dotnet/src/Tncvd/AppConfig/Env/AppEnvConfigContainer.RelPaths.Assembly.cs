using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using Tncvd.Collections;
using Tncvd.Reflection;

namespace Tncvd.AppConfig.Env
{
    public partial class AppEnvConfigContainer
    {
        public string GetEnvRelativePath(string rootEnvDirName, Assembly assembly, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                Collections.HelperMethods.ConcatArraysAsStrings(
                    new string[] {
                        rootEnvDirName,
                        assembly.GetAssemblyFullName()
                    },
                    relPathParts));

            return path;
        }

        public string GetEnvConfigPath(Assembly assembly, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Config.Value,
                    assembly,
                    relPathParts);

            return path;
        }

        public string GetEnvContentPath(Assembly assembly, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Content.Value,
                    assembly,
                    relPathParts);

            return path;
        }

        public string GetEnvDataPath(Assembly assembly, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Data.Value,
                    assembly,
                    relPathParts);

            return path;
        }

        public string GetEnvLogsPath(Assembly assembly, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Logs.Value,
                    assembly,
                    relPathParts);

            return path;
        }

        public string GetEnvMetadataPath(Assembly assembly, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Metadata.Value,
                    assembly,
                    relPathParts);

            return path;
        }

        public string GetEnvTempPath(Assembly assembly, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Temp.Value,
                    assembly,
                    relPathParts);

            return path;
        }
    }
}
