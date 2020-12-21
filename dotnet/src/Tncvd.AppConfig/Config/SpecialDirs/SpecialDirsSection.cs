using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.SpecialDirs
{
    public class SpecialDirsSection : ConfigurationSection
    {
        private const string SPECIAL_DIR_NAMES_KEY = "specialDirNames";
        private const string SPECIAL_DIR_DELIMITERS_KEY = "specialDirDelimiters";

        [ConfigurationProperty(SPECIAL_DIR_NAMES_KEY, IsDefaultCollection = false)]
        public Settings.SettingElementCollection SpecialDirNames
        {
            get
            {
                Settings.SettingElementCollection retInstance = null;
                if (this[SPECIAL_DIR_NAMES_KEY] != null)
                {
                    retInstance = (Settings.SettingElementCollection)this[SPECIAL_DIR_NAMES_KEY];
                }
                return retInstance;
            }

            set
            {
                this[SPECIAL_DIR_NAMES_KEY] = value;
            }
        }

        [ConfigurationProperty(SPECIAL_DIR_DELIMITERS_KEY, IsDefaultCollection = false)]
        public Settings.SettingElementCollection SpecialDirDelimiters
        {
            get
            {
                Settings.SettingElementCollection retInstance = null;
                if (this[SPECIAL_DIR_DELIMITERS_KEY] != null)
                {
                    retInstance = (Settings.SettingElementCollection)this[SPECIAL_DIR_DELIMITERS_KEY];
                }
                return retInstance;
            }

            set
            {
                this[SPECIAL_DIR_DELIMITERS_KEY] = value;
            }
        }
    }
}
