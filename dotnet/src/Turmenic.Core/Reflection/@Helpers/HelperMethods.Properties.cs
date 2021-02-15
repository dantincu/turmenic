using System;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;

namespace Turmenic.Core.Reflection
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

        #region CopyProps

        public static void CopyProps<TArg>(this TArg target, TArg source)
        {
            PropertyInfo[] propInfos = GetInstPropsWPubGttrPubSttr(typeof(TArg));
            CopyProps(target, source, propInfos);
        }

        public static void CopyProps<TArg>(this TArg target, TArg source, Expression<Func<TArg, object>>[] lambdaExprArr)
        {
            PropertyInfo[] propInfos = lambdaExprArr.Select(expr => expr.GetMemberFromLambda() as PropertyInfo).ToArray();
            CopyProps(target, source, propInfos);
        }

        public static void CopyProps<TArg>(this TArg target, TArg source, PropertyInfo[] propInfos)
        {
            foreach (PropertyInfo propInfo in propInfos)
            {
                object value = propInfo.GetValue(source);
                propInfo.SetValue(target, value);
            }
        }

        public static void CopyProps<TArg>(this TArg target, TArg source, string[] propNames)
        {
            PropertyInfo[] propInfos = GetInstPropsWPubGttrPubSttr(
                typeof(TArg),
                propInfo => propNames.Contains(propInfo.Name));

            CopyProps(target, source, propInfos);
        }

        #endregion CopyProps

        #region CopyPropsExcept

        public static void CopyPropsExcept<TArg>(this TArg target, TArg source, Expression<Func<TArg, object>>[] expLambdaExprArr)
        {
            PropertyInfo[] excPropInfos = expLambdaExprArr.Select(expr => expr.GetMemberFromLambda() as PropertyInfo).ToArray();
            CopyPropsExcept(target, source, excPropInfos);
        }

        public static void CopyPropsExcept<TArg>(this TArg target, TArg source, PropertyInfo[] excPropInfos)
        {
            string[] expPropNames = excPropInfos.Select(excPropInfo => excPropInfo.Name).ToArray();
            CopyPropsExcept(target, source, expPropNames);
        }

        public static void CopyPropsExcept<TArg>(this TArg target, TArg source, string[] expPropNames)
        {
            PropertyInfo[] propInfos = GetInstPropsWPubGttrPubSttr(
                typeof(TArg),
                propInfo => expPropNames.Contains(propInfo.Name) == false);

            CopyProps(target, source, propInfos);
        }

        #endregion CopyPropsExcept
    }
}
