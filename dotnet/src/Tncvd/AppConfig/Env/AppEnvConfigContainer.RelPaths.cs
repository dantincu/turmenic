using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Tncvd.Collections;

namespace Tncvd.AppConfig.Env
{
    public partial class AppEnvConfigContainer
    {
        public string GetEnvRelativePath(params string[] relPathParts)
        {
            string path = Path.Combine(
                HelperMethods.ConcatArraysAsStrings(
                    new string[] {
                        this._envRootPath
                    },
                    relPathParts));

            return path;
        }

        public string GetEnvRelativePath(string rootEnvDirName, params string[] relPathParts)
        {
            string path = this.GetEnvRelativePath(
                HelperMethods.ConcatArraysAsStrings(
                    new string[] {
                        rootEnvDirName
                    },
                    relPathParts));

            return path;
        }

        public string GetEnvConfigPath(params string[] relPathParts)
        {
            string retVal = this.GetEnvRelativePath(
                this.EnvDirNames.Config.Value,
                relPathParts);

            return retVal;
        }

        public string GetEnvContentPath(params string[] relPathParts)
        {
            string retVal = this.GetEnvRelativePath(
                this.EnvDirNames.Content.Value,
                relPathParts);

            return retVal;
        }

        public string GetEnvDataPath(params string[] relPathParts)
        {
            string retVal = this.GetEnvRelativePath(
                this.EnvDirNames.Data.Value,
                relPathParts);

            return retVal;
        }

        public string GetEnvLogsPath(params string[] relPathParts)
        {
            string retVal = this.GetEnvRelativePath(
                this.EnvDirNames.Logs.Value,
                relPathParts);

            return retVal;
        }

        public string GetEnvMetadataPath(params string[] relPathParts)
        {
            string retVal = this.GetEnvRelativePath(
                this.EnvDirNames.Metadata.Value,
                relPathParts);

            return retVal;
        }

        public string GetEnvTempPath(params string[] relPathParts)
        {
            string retVal = this.GetEnvRelativePath(
                this.EnvDirNames.Temp.Value,
                relPathParts);

            return retVal;
        }
    }
}
