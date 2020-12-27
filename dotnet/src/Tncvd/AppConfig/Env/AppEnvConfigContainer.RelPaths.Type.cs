using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Tncvd.Collections;
using Tncvd.Reflection;

namespace Tncvd.AppConfig.Env
{
    public partial class AppEnvConfigContainer
    {
        public string GetEnvRelativePath(string rootEnvDirName, Type type, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                Collections.HelperMethods.ConcatArraysAsStrings(
                    new string[] {
                        rootEnvDirName,
                        type.GetTypeFullName()
                    },
                    relPathParts));

            return path;
        }

        public string GetEnvConfigPath(Type type, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Config.Value,
                    type,
                    relPathParts);

            return path;
        }

        public string GetEnvContentPath(Type type, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Content.Value,
                    type,
                    relPathParts);

            return path;
        }

        public string GetEnvDataPath(Type type, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Data.Value,
                    type,
                    relPathParts);

            return path;
        }

        public string GetEnvLogsPath(Type type, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Logs.Value,
                    type,
                    relPathParts);

            return path;
        }

        public string GetEnvMetadataPath(Type type, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Metadata.Value,
                    type,
                    relPathParts);

            return path;
        }

        public string GetEnvTempPath(Type type, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                    this.EnvDirNames.Temp.Value,
                    type,
                    relPathParts);

            return path;
        }
    }
}
