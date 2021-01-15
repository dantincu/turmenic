using System.Reflection;

namespace Tncvd.Core.Reflection
{
    public static partial class HelperMethods
    {
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
    }
}
