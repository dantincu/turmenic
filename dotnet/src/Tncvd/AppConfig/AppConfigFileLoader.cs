using System;
using System.Collections.Generic;
using System.Text;

namespace Tncvd.AppConfig
{
    internal class AppConfigFileLoader : AssemblyConfigFileLoaderBase
    {
        protected override bool AssemblyIsExecutable => false;
    }
}
