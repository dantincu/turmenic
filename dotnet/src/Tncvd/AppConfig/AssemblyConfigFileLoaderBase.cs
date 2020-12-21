using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Tncvd.AppConfig.Env;

namespace Tncvd.AppConfig
{
    public abstract class AssemblyConfigFileLoaderBase : ConfigFileLoaderBase
    {
        protected abstract bool AssemblyIsExecutable { get; }

        protected override string GetConfigFilePath()
        {
            string retVal = AppEnvConfigContainer.Instance.GetEnvConfigPath(
                this.GetType().Assembly,
                this.GetDefaultExternalConfigFileName());

            return retVal;
        }
    }
}
