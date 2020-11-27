using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Settings;
using Tncvd.AppConfig.External;

namespace Tncvd.AppConfig.Settings
{
    public abstract class AppSettingsLoaderBase : ExternalAppConfigLoaderBase<TncvdSettingsSectionGroup>
    {
    }
}
