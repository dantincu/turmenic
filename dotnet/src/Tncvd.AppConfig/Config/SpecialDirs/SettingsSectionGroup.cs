using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.SpecialDirs
{
    public class SettingsSectionGroup : ConfigurationSectionGroup
    {
        public const string SPECIAL_DIRS_SECTION_KEY = "specialDirs";

        [ConfigurationProperty(SPECIAL_DIRS_SECTION_KEY, IsRequired = true)]
        public SpecialDirsSection SpecialDirsSection
        {
            get { return (SpecialDirsSection)Sections[SPECIAL_DIRS_SECTION_KEY]; }
        }
    }
}
