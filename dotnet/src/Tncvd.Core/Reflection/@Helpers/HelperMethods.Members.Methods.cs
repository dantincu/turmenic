﻿using System.Reflection;

namespace Tncvd.Core.Reflection
{
    public static partial class HelperMethods
    {
        #region Extensions

        public static bool IsInstPub(this MethodBase methodBase)
        {
            bool result = methodBase.IsStatic == false && methodBase.IsPublic == true;
            return result;
        }

        public static bool IsInstPubOrPrtc(this MethodBase methodBase)
        {
            bool result = methodBase.IsStatic == false && (methodBase.IsPublic == true || methodBase.IsFamily == true);
            return result;
        }

        public static bool IsInstPrtc(this MethodBase methodBase)
        {
            bool result = methodBase.IsStatic == false && methodBase.IsFamily == true;
            return result;
        }

        #endregion Extensions

        public static bool MthIsInstPub(MethodBase methodInfo)
        {
            bool result = methodInfo != null;
            result = result && methodInfo.IsInstPub();

            return result;
        }

        public static bool MthIsInstPubOrPrtc(MethodBase methodInfo)
        {
            bool result = methodInfo != null;
            result = result && methodInfo.IsInstPubOrPrtc();

            return result;
        }

        public static bool MthIsInstPrtc(MethodBase methodInfo)
        {
            bool result = methodInfo != null;
            result = result && methodInfo.IsInstPrtc();

            return result;
        }
    }
}
