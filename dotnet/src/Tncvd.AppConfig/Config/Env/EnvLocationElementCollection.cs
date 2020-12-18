using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Config.Env
{
    [ConfigurationCollection(typeof(EnvLocationElement), AddItemName = "add")]
    public class EnvLocationElementCollection : ConfigurationElementCollection
    {
        protected override ConfigurationElement CreateNewElement()
        {
            return new EnvLocationElement();
        }

        protected override object GetElementKey(ConfigurationElement element)
        {
            return ((EnvLocationElement)element).Name;
        }
    }
}
