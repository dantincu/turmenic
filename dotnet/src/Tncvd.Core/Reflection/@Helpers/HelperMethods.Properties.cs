using System;
using System.Linq;
using System.Reflection;

namespace Tncvd.Core.Reflection
{
    public static partial class HelperMethods
    {
        public static bool IsInstWPubGttrPubSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.IsInstWPubGttr() && propertyInfo.IsInstWPubSttr();
            return retVal;
        }

        public static bool IsInstWPubGttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanRead;
            retVal = retVal && (propertyInfo.GetMethod.IsInstPub());

            return retVal;
        }

        public static bool IsInstWPubSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanWrite;
            retVal = retVal && (propertyInfo.SetMethod.IsInstPub());

            return retVal;
        }

        public static bool IsInstWPubOrPrtcSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanWrite;
            retVal = retVal && (propertyInfo.SetMethod.IsInstPubOrPrtc());

            return retVal;
        }

        public static bool IsInstWPrtcSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanWrite;
            retVal = retVal && (propertyInfo.SetMethod.IsInstPrtc());

            return retVal;
        }

        public static Func<PropertyInfo, bool> GetAutoInitPropsSelector(Type targetType = null, Type propertyAttributeType = null, bool matchExactAttribute = false)
        {
            propertyAttributeType = propertyAttributeType ?? typeof(AutoInitAttribute);

            Func<PropertyInfo, bool> selector = propertyInfo =>
            {
                Type propType = propertyInfo.PropertyType;

                bool retVal = propertyInfo.HasAttribute(propertyAttributeType, matchExactAttribute);
                retVal = retVal && propType.GetConstructors().Any(c => c.IsPublic && c.GetParameters().Length == 0);

                if (targetType != null)
                {
                    retVal = retVal && targetType.IsAssignableFrom(propType);
                }

                return retVal;
            };

            return selector;
        }
    }
}
