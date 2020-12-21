using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace Tncvd.AppConfig.Config.Settings.Simple
{
    [ConfigurationCollection(typeof(SimpleSettingElement), AddItemName = DEFAULT_ADD_ITEM_NAME)]
    public class SimpleSettingElementCollection : ConfigurationElementCollection
    {
        public const string DEFAULT_ADD_ITEM_NAME = "add";

        protected override ConfigurationElement CreateNewElement()
        {
            return new SimpleSettingElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((SimpleSettingElement)element).Name;
        }
    }
}
