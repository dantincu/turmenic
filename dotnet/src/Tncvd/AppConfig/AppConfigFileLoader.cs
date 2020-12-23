using System;
using System.Collections.Generic;
using System.Text;

namespace Tncvd.AppConfig
{
    public class AppConfigFileLoader : AssemblyConfigFileLoaderBase
    {
        protected override bool AssemblyIsExecutable => false;
    }
}
