using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Turmerik.Core.Reflection
{
    public static partial class HelperMethods
    {
        public static Attribute GetAttribute(
            this MemberInfo memberInfo,
            Type attributeType,
            bool inherit = true,
            bool matchExactType = false)
        {
            Attribute retVal = null;

            if (memberInfo != null)
            {
                if (matchExactType)
                {
                    retVal = memberInfo.GetCustomAttributes(inherit).SingleOrDefault(attr => attr.GetType() == attributeType) as Attribute;
                }

                retVal = memberInfo.GetCustomAttribute(attributeType, inherit);
            }

            return retVal;
        }

        public static bool HasAttribute(this MemberInfo memberInfo,
            Type attributeType,
            bool inherit = true,
            bool matchExactType = false)
        {
            Attribute attr = memberInfo.GetAttribute(attributeType, inherit, matchExactType);
            return attr != null;
        }

        public static TAttribute GetAttribute<TAttribute>(
            this MemberInfo memberInfo,
            bool inherit = true,
            bool matchExactType = false) where TAttribute : Attribute
        {
            TAttribute retVal = null;

            if (memberInfo != null)
            {
                if (matchExactType)
                {
                    retVal = memberInfo.GetCustomAttributes<TAttribute>(inherit).SingleOrDefault(attr => attr.GetType() == typeof(TAttribute));
                }

                retVal = memberInfo.GetCustomAttribute<TAttribute>(inherit);
            }

            return retVal;
        }

        public static bool HasAttribute<TAttribute>(
            this MemberInfo memberInfo,
            bool inherit = true,
            bool matchExactType = false) where TAttribute : Attribute
        {
            TAttribute attr = memberInfo.GetAttribute<TAttribute>(inherit, matchExactType);
            return attr != null;
        }

        public static IEnumerable<Attribute> GetAttributes(
            this MemberInfo memberInfo,
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
            this MemberInfo memberInfo,
            bool inherit = true) where TAttribute : Attribute
        {
            IEnumerable<TAttribute> attrEnum = memberInfo?.GetCustomAttributes<TAttribute>(inherit);

            return attrEnum;
        }
    }
}
