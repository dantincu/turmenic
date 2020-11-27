using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config;

namespace Tncvd.AppConfig
{
    public class AppConfigLoader : AppConfigLoaderBase<TncvdSectionGroup>
    {
        protected override string AssemblyName => this.GetType().Assembly.FullName;

        protected override bool AssemblyIsExecutable => false;

        protected override string SectionGroupName => "tncvd";
    }
}
