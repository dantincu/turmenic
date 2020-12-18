using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Env;

namespace Tncvd.AppConfig.Env
{
    public class AppEnvConfigLoader : AppEnvConfigLoaderBase<TncvdEnvLocationsSectionGroup>
    {
        protected override bool AssemblyIsExecutable => false;
    }
}
