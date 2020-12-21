using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using Tncvd.AppConfig.Config.Settings;
using Tncvd.AppConfig.Utility.Readonly.Simple;

namespace Tncvd.AppConfig.Utility.Readonly
{
    public class SettingElementReadonly : SimpleSettingElementReadonly
    {
        public SettingElementReadonly(Config.Settings.SettingElement element) : base(element)
        {
            this.AltValue = element.AltValue;
        }

        public string AltValue { get; }
    }
}
