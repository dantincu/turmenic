using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Tncvd.Core.Reflection
{
    public static partial class HelperMethods
    {
        public static Attribute GetAttribute(
            this ParameterInfo parameterInfo,
            Type attributeType,
            bool inherit = true,
            bool matchExactType = false)
        {
            Attribute retVal = null;

            if (parameterInfo != null)
            {
                if (matchExactType)
                {
                    retVal = parameterInfo.GetCustomAttributes(inherit).SingleOrDefault(attr => attr.GetType() == attributeType) as Attribute;
                }

                retVal = parameterInfo.GetCustomAttribute(attributeType, inherit);
            }

            return retVal;
        }

        public static bool HasAttribute(
            this ParameterInfo parameterInfo,
            Type attributeType,
            bool inherit = true,
            bool matchExactType = false)
        {
            Attribute attr = parameterInfo.GetAttribute(attributeType, inherit, matchExactType);
            return attr != null;
        }

        public static TAttribute GetAttribute<TAttribute>(
            this ParameterInfo parameterInfo,
            bool inherit = true,
            bool matchExactType = false) where TAttribute : Attribute
        {
            TAttribute retVal = null;

            if (parameterInfo != null)
            {
                if (matchExactType)
                {
                    retVal = parameterInfo.GetCustomAttributes<TAttribute>(inherit).SingleOrDefault(attr => attr.GetType() == typeof(TAttribute));
                }

                retVal = parameterInfo.GetCustomAttribute<TAttribute>(inherit);
            }

            return retVal;
        }

        public static bool HasAttribute<TAttribute>(
            this ParameterInfo parameterInfo,
            bool inherit = true,
            bool matchExactType = false) where TAttribute : Attribute
        {
            TAttribute attr = parameterInfo.GetAttribute<TAttribute>(inherit, matchExactType);
            return attr != null;
        }

        public static IEnumerable<Attribute> GetAttributes(
            this ParameterInfo memberInfo,
            Type attributeType,
            bool inherit = true)
        {
            IEnumerable<Attribute> attrEnum = null;

            if (memberInfo != null)
            {
                attrEnum = CustomAttributeExtensions.GetCustomAttributes(memberInfo, attributeType, inherit);
            }

            return attrEnum;
        }

        public static IEnumerable<TAttribute> GetAttributes<TAttribute>(
            this ParameterInfo memberInfo,
            bool inherit = true) where TAttribute : Attribute
        {
            IEnumerable<TAttribute> attrEnum = memberInfo?.GetCustomAttributes<TAttribute>(inherit);

            return attrEnum;
        }
    }
}
