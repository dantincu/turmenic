using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Settings.Simple;

namespace Tncvd.AppConfig.Config.Settings
{
    public class SettingElement : SimpleSettingElement
    {
        private const string ALT_VALUE_KEY = "altValue";

        [ConfigurationProperty(ALT_VALUE_KEY, DefaultValue = "", IsKey = false, IsRequired = false)]
        public string AltValue
        {
            get
            {
                string retVal = (string)this[ALT_VALUE_KEY];
                return retVal;
            }

            set
            {
                this[ALT_VALUE_KEY] = value;
            }
        }
    }
}
