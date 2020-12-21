using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Settings.Simple;

namespace Tncvd.AppConfig.Config.Env
{
    public class EnvDirsSection : ConfigurationSection
    {
        private const string DIR_NAMES_KEY = "envDirNames";

        [ConfigurationProperty(DIR_NAMES_KEY, IsDefaultCollection = true)]
        public SimpleSettingElementCollection DirNames
        {
            get
            {
                SimpleSettingElementCollection retInstance = null;
                if (this[DIR_NAMES_KEY] != null)
                {
                    retInstance = (SimpleSettingElementCollection)this[DIR_NAMES_KEY];
                }
                return retInstance;
            }

            set
            {
                this[DIR_NAMES_KEY] = value;
            }
        }
    }
}
