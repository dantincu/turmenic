using System;
using System.Collections.Generic;
using System.Text;
using Tncvd.AppConfig.Config.Settings.Simple;

namespace Tncvd.AppConfig.Utility.Readonly.Simple
{
    public class SimpleSettingElementReadonly
    {
        public SimpleSettingElementReadonly(SimpleSettingElement element)
        {
            this.Name = element.Name;
            this.Value = element.Value;
        }

        public string Name { get; }

        public string Value { get; }
    }
}
