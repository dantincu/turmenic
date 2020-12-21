using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Tncvd.AppConfig.Config.Settings.Simple;
using Tncvd.AppConfig.Utility.Attributes;
using Tncvd.AppConfig.Utility.Readonly;
using Tncvd.AppConfig.Utility.Readonly.Simple;
using Tncvd.Reflection;
using Tncvd.Text;

namespace Tncvd.AppConfig.Config.Data.Base
{
    public delegate void PropValueSetter(PropertyInfo propertyInfo, SimpleSettingElementReadonly settingElement);

    public class SettingsDataPropsFiller
    {
        private readonly Type _settingsDataType;
        private PropValueSetter _propValueSetter;

        public SettingsDataPropsFiller(Type settingsDataType)
        {
            this._settingsDataType = settingsDataType;
        }

        public event PropValueSetter OnPropValueAssigned
        {
            add
            {
                this._propValueSetter += value;
            }

            remove
            {
                this._propValueSetter -= value;
            }
        }

        public void FillProperties(SimpleSettingElement[] settingElementsArr, bool throwIfMissMatch)
        {
            PropertyInfo[] propsToFill = this.GetPropsToFill(this._settingsDataType);
            this.FillProperties(settingElementsArr, propsToFill, throwIfMissMatch);
        }

        private Type GetConversionType(Type elementType)
        {
            Type conversionType;

            if (elementType == typeof(SimpleSettingElement))
            {
                conversionType = typeof(SimpleSettingElementReadonly);
            }
            else if (elementType == typeof(Settings.SettingElement))
            {
                conversionType = typeof(SettingElementReadonly);
            }
            else
            {
                throw new NotSupportedException($"Element type {elementType.FullName} is not currently supported");
            }

            return conversionType;
        }

        private void FillProperties(SimpleSettingElement[] settingElementsArr, PropertyInfo[] propsToFill, bool throwIfMissMatch)
        {
            foreach (SimpleSettingElement settingElement in settingElementsArr)
            {
                this.FillProp(settingElement, propsToFill, throwIfMissMatch);
            }
        }

        private void FillProp(SimpleSettingElement settingElement, PropertyInfo[] propsToFill, bool throwIfMissMatch)
        {
            PropertyInfo matchingProperty = this.GetMatchingProperty(settingElement, propsToFill, throwIfMissMatch);

            if (matchingProperty != null)
            {
                this.FillProp(settingElement, matchingProperty);
            }
        }

        private void FillProp(SimpleSettingElement settingElement, PropertyInfo matchingProperty)
        {
            Type conversionType = this.GetConversionType(settingElement.GetType());
            Type matchingPropertyType = matchingProperty.PropertyType;

            this.AssurePropertyTypeMatches(settingElement, matchingPropertyType, matchingProperty.Name, conversionType);

            SimpleSettingElementReadonly propertyValue = Activator.CreateInstance(conversionType, settingElement) as SimpleSettingElementReadonly;
            this._propValueSetter(matchingProperty, propertyValue);
        }

        private PropertyInfo GetMatchingProperty<TElement>(TElement settingElement, PropertyInfo[] propsToFill, bool throwIfNoMatch) where TElement : SimpleSettingElement
        {
            PropertyInfo matchingProperty = propsToFill.SingleOrDefault(prop => this.GetElementName(prop) == settingElement.Name);

            if (matchingProperty == null && throwIfNoMatch == true)
            {
                throw new InvalidOperationException($"Element with name {settingElement.Name} has no corresponding property to be assigned to!");
            }

            return matchingProperty;
        }

        private string GetElementName(PropertyInfo propertyInfo)
        {
            string elementName = null;
            if (propertyInfo.IsDefined(typeof(ElementKeyAttribute)))
            {
                ElementKeyAttribute attribute = propertyInfo.GetCustomAttribute<ElementKeyAttribute>();
                elementName = attribute.ElementKey;
            }
            else
            {
                elementName = propertyInfo.Name.FirstLetterToLower();
            }

            return elementName;
        }

        private PropertyInfo[] GetPropsToFill(Type type)
        {
            PropertyInfo[] propsToFill = type.GetInstPropsWPubGttrPrtcSttr(prop => typeof(SimpleSettingElementReadonly).IsAssignableFrom(prop.PropertyType));
            return propsToFill;
        }

        private void AssurePropertyTypeMatches(SimpleSettingElement settingElement, Type matchingPropertyType, string matchingPropertyName, Type conversionType)
        {
            if (matchingPropertyType != conversionType)
            {
                throw new InvalidOperationException(
                    $"Element with name {settingElement.Name} of type {settingElement.GetType().FullName} cannot be converted and assigned to matching property {matchingPropertyName} of type {matchingPropertyType.FullName}!");
            }
        }
    }
}
