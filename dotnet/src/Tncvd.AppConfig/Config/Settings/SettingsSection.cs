using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.Settings
{
    public class SettingsSection : ConfigurationSection
    {
        private const string DEFAULT_SETTINGS_KEY = "default";

        [ConfigurationProperty(DEFAULT_SETTINGS_KEY, IsDefaultCollection = true)]
        public SettingElementCollection DefaultSettings
        {
            get
            {
                SettingElementCollection retInstance = null;
                if (this[DEFAULT_SETTINGS_KEY] != null)
                {
                    retInstance = (SettingElementCollection)this[DEFAULT_SETTINGS_KEY];
                }
                return retInstance;
            }

            set
            {
                this[DEFAULT_SETTINGS_KEY] = value;
            }
        }
    }
}
