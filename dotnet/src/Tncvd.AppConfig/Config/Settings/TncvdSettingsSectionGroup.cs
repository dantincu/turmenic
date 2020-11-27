using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.Settings
{
    public class TncvdSettingsSectionGroup : ConfigurationSectionGroup
    {
        private const string SETTINGS_KEY = "settings";

        [ConfigurationProperty(SETTINGS_KEY, IsRequired = false)]
        public SettingsSection SettingsSection
        {
            get { return (SettingsSection)Sections[SETTINGS_KEY]; }
        }
    }
}
