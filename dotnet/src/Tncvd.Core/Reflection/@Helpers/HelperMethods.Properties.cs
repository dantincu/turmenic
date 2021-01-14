﻿using System;
using System.Linq;
using System.Reflection;

namespace Tncvd.Core.Reflection
{
    public static partial class HelperMethods
    {
        #region Extensions

        public static bool IsInstWPubGttrPubSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.IsInstWPubGttr() && propertyInfo.IsInstWPubSttr();
            return retVal;
        }

        public static bool IsInstWPubGttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanRead;
            retVal = retVal && (propertyInfo.GetMethod?.IsInstPub() ?? false);

            return retVal;
        }

        public static bool IsInstWPubSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanWrite;
            retVal = retVal && (propertyInfo.SetMethod?.IsInstPub() ?? false);

            return retVal;
        }

        public static bool IsInstWPubOrPrtcSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanWrite;
            retVal = retVal && (propertyInfo.SetMethod?.IsInstPubOrPrtc() ?? false);

            return retVal;
        }

        public static bool IsInstWPrtcSttr(this PropertyInfo propertyInfo)
        {
            bool retVal = propertyInfo.CanWrite;
            retVal = retVal && (propertyInfo.SetMethod?.IsInstPrtc() ?? false);

            return retVal;
        }

        public static Func<PropertyInfo, bool> GetSimpleTypeSelector(this Type targetType)
        {
            Func<PropertyInfo, bool> selector = propertyInfo =>
            {
                Type propType = propertyInfo.GetType();

                bool retVal = targetType.IsAssignableFrom(propType);
                retVal = retVal && propType.GetConstructors().Any(c => c.IsPublic && c.GetParameters().Length == 0);

                return retVal;
            };

            return selector;
        }

        #endregion Extensions

        public static bool PropIsInstWPubGttrPubSttr(PropertyInfo propertyInfo)
        {
            bool retVal = false;

            if (propertyInfo != null)
            {
                retVal = propertyInfo.IsInstWPubGttrPubSttr();
            }

            return retVal;
        }

        public static bool PropIsInstPubGttr(PropertyInfo propertyInfo)
        {
            bool retVal = false;

            if (propertyInfo != null)
            {
                retVal = propertyInfo.IsInstWPubGttr();
            }

            return retVal;
        }

        public static bool PropIsInstWPubSttr(PropertyInfo propertyInfo)
        {
            bool retVal = false;

            if (propertyInfo != null)
            {
                retVal = propertyInfo.IsInstWPubSttr();
            }

            return retVal;
        }

        public static bool PropIsInstWPrtcSttr(PropertyInfo propertyInfo)
        {
            bool retVal = false;

            if (propertyInfo != null)
            {
                retVal = propertyInfo.IsInstWPrtcSttr();
            }

            return retVal;
        }
    }
}
