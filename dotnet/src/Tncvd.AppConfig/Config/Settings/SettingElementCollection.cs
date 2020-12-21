using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Settings.Simple;

namespace Tncvd.AppConfig.Config.Settings
{
    [ConfigurationCollection(typeof(SettingElement), AddItemName = SimpleSettingElementCollection.DEFAULT_ADD_ITEM_NAME)]
    public class SettingElementCollection : ConfigurationElementCollection
    {
        protected override ConfigurationElement CreateNewElement()
        {
            return new SettingElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((SettingElement)element).Name;
        }
    }
}
