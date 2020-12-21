using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace Tncvd.AppConfig.Config.Settings.Simple
{
    public class SimpleSettingElement : ConfigurationElement
    {
        public const string NAME_KEY = "name";
        public const string VALUE_KEY = "value";

        [ConfigurationProperty(NAME_KEY, DefaultValue = "", IsKey = true, IsRequired = true)]
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
