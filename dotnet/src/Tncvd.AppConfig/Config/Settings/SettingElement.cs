using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.Settings
{
    public class SettingElement : ConfigurationElement
    {
        private const string NAME_KEY = "name";
        private const string VALUE_KEY = "value";

        private const string DEFAULT_SETTING_NAME = "default";

        [ConfigurationProperty(NAME_KEY, DefaultValue = DEFAULT_SETTING_NAME, IsKey = true, IsRequired = true)]
        public string Name
        {
            get
            {
                string retVal = (string)this[NAME_KEY];
                return retVal;
            }

            set
            {
                this[NAME_KEY] = value;
            }
        }

        [ConfigurationProperty(VALUE_KEY, DefaultValue = "", IsKey = false, IsRequired = true)]
        public string Value
        {
            get
            {
                string retVal = (string)this[VALUE_KEY];
                return retVal;
            }

            set
            {
                this[VALUE_KEY] = value;
            }
        }
    }
}
