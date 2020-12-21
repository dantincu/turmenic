using System.Reflection;
using Tncvd.AppConfig.Config.Settings.Simple;
using Tncvd.AppConfig.Utility;
using Tncvd.AppConfig.Utility.Readonly.Simple;

namespace Tncvd.AppConfig.Config.Data.Base
{
    public abstract class SettingsDataBase
    {
        public SettingsDataBase(SimpleSettingElementCollection settingElementCollection)
        {
            this.SetPropertyValues(settingElementCollection.GetSettingElements());
        }

        public SettingsDataBase(Settings.SettingElementCollection settingElementCollection)
        {
            this.SetPropertyValues(settingElementCollection.GetSettingElements());
        }

        protected virtual void SetPropertyValues(SimpleSettingElement[] settingElementsArr)
        {
            SettingsDataPropsFiller propsFiller = new SettingsDataPropsFiller(this.GetType());

            propsFiller.OnPropValueAssigned += this.SetPropertyValue;
            propsFiller.FillProperties(settingElementsArr, true);
            propsFiller.OnPropValueAssigned -= this.SetPropertyValue;
        }

        protected virtual void SetPropertyValue(PropertyInfo matchingProperty, SimpleSettingElementReadonly propertyValue)
        {
            matchingProperty.SetValue(this, propertyValue);
        }
    }
}
