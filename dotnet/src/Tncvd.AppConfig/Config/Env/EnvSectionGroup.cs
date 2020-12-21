using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.Env
{
    public class EnvSectionGroup : ConfigurationSectionGroup
    {
        private const string ENV_DIRS_SECTION_KEY = "envDirs";

        [ConfigurationProperty(ENV_DIRS_SECTION_KEY, IsRequired = true)]
        public EnvDirsSection EnvDirsSection
        {
            get { return (EnvDirsSection)Sections[ENV_DIRS_SECTION_KEY]; }
        }
    }
}
