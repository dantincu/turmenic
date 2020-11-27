using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Settings
{
    public class AppSettingsContainer : AppSettingsContainerBase<AppSettingsLoader>
    {
        public const string DEFAULT_APP_NAME_PREFIX_KEY = "defaultAppNamePrefix";

        private static AppSettingsContainer _instance;
        
        private AppSettingsContainer()
        {
            this.LoadData();
        }

        public static AppSettingsContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AppSettingsContainer();
                }

                return _instance;
            }
        }

        public string DefaultAppNamePrefix => this.GetValue(DEFAULT_APP_NAME_PREFIX_KEY);
    }
}
