using System;
using System.Linq;
using System.Reflection;

namespace Turmenic.Core.Reflection
{
    public static partial class HelperMethods
    {
        public static PropertyInfo[] GetInstPropsWPubGttr(this Type type)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubSttr(this Type type)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubSttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubSttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrPubSttr(this Type type)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttrPubSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrPubSttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttrPubSttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPubProps(this Type type)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttrPubSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPubProps(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttrPubSttr() && filter(prop)).ToArray();
            return retArr;
        }
        
        public static PropertyInfo[] GetInstPropsWPubGttrPrtcSttr(this Type type)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(
                prop => prop.IsInstWPubGttr() && prop.IsInstWPrtcSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrPrtcSttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(
                prop => prop.IsInstWPubGttr() && prop.IsInstWPrtcSttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPrtcSttr(this Type type)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(
                prop => prop.IsInstWPrtcSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPrtcSttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(
                prop => prop.IsInstWPrtcSttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubOrPrtcSttr(this Type type)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(
                prop => prop.IsInstWPubOrPrtcSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubOrPrtcSttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type?.GetRuntimeProperties().Where(
                prop => prop.IsInstWPubOrPrtcSttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrSameType(this Type type, Type propType)
        {
            PropertyInfo[] retArr = GetInstPropsWPubGttr(type, propInfo => propInfo.PropertyType == propType);
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrSameGenTypeDef(this Type type, Type propType)
        {
            PropertyInfo[] retArr = GetInstPropsWPubGttr(type, propInfo => propInfo.PropertyType.HasSameMetadataDefinitionAs(propType));
            return retArr;
        }
    }
}
