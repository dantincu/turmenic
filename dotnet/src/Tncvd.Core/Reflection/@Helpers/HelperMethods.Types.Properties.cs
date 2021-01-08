using System;
using System.Linq;
using System.Reflection;

namespace Tncvd.Core.Reflection
{
    public static partial class HelperMethods
    {
        #region Extensions

        public static PropertyInfo[] GetInstPropsWPubGttr(this Type type)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubSttr(this Type type)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(prop => prop.IsInstWPubSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubSttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(prop => prop.IsInstWPubSttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrPubSttr(this Type type)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttrPubSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPubProps(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(prop => prop.IsInstWPubGttrPubSttr() && filter(prop)).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrPrtcSttr(this Type type)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(
                prop => prop.IsInstWPubGttr() && prop.IsInstWPrtcSttr()).ToArray();
            return retArr;
        }

        public static PropertyInfo[] GetInstPropsWPubGttrPrtcSttr(this Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = type.GetRuntimeProperties().Where(
                prop => prop.IsInstWPubGttr() && prop.IsInstWPrtcSttr() && filter(prop)).ToArray();
            return retArr;
        }

        #endregion Extensions

        public static PropertyInfo[] TryGetInstPropsWPubGttr(Type type)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPropsWPubGttr();
            }
            
            return retArr;
        }

        public static PropertyInfo[] TryGetInstPropsWPubGttr(Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPropsWPubGttr(filter);
            }

            return retArr;
        }

        public static PropertyInfo[] TryGetInstPropsWPubSttr(Type type)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPropsWPubSttr();
            }

            return retArr;
        }

        public static PropertyInfo[] TryGetInstPropsWPubSttr(Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPropsWPubSttr(filter);
            }

            return retArr;
        }

        public static PropertyInfo[] TryGetInstPropsWPubGttrPubSttr(Type type)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPropsWPubGttrPubSttr();
            }

            return retArr;
        }

        public static PropertyInfo[] TryGetInstPropsWPubGttrPubSttr(Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPubProps(filter);
            }

            return retArr;
        }

        public static PropertyInfo[] TryGetInstPropsWPubGttrPrtcSttr(Type type)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPropsWPubGttrPrtcSttr();
            }

            return retArr;
        }

        public static PropertyInfo[] TryGetPropsWPubGttrPrtcSttr(Type type, Func<PropertyInfo, bool> filter)
        {
            PropertyInfo[] retArr = null;
            if (type != null)
            {
                retArr = type.GetInstPropsWPubGttrPrtcSttr(filter);
            }

            return retArr;
        }
    }
}
