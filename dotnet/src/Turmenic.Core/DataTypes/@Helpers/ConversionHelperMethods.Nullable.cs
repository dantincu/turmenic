using System;

namespace Turmenic.Core.DataTypes
{
    public static partial class ConversionHelperMethods
    {
        public static bool? ConvertToBool(this string s)
        {
            bool? retVal = null;
            bool value;

            if (string.IsNullOrWhiteSpace(s) == false && bool.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static byte? ConvertToByte(this string s)
        {
            byte? retVal = null;
            byte value;

            if (string.IsNullOrWhiteSpace(s) == false && byte.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static sbyte? ConvertToSbyte(this string s)
        {
            sbyte? retVal = null;
            sbyte value;

            if (string.IsNullOrWhiteSpace(s) == false && sbyte.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static short? ConvertToShort(this string s)
        {
            short? retVal = null;
            short value;

            if (string.IsNullOrWhiteSpace(s) == false && short.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static ushort? ConvertToUshort(this string s)
        {
            ushort? retVal = null;
            ushort value;

            if (string.IsNullOrWhiteSpace(s) == false && ushort.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static int? ConvertToInt(this string s)
        {
            int? retVal = null;
            int value;

            if (string.IsNullOrWhiteSpace(s) == false && int.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static uint? ConvertToUint(this string s)
        {
            uint? retVal = null;
            uint value;

            if (string.IsNullOrWhiteSpace(s) == false && uint.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static long? ConvertToLong(this string s)
        {
            long? retVal = null;
            long value;

            if (string.IsNullOrWhiteSpace(s) == false && long.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static ulong? ConvertToUlong(this string s)
        {
            ulong? retVal = null;
            ulong value;

            if (string.IsNullOrWhiteSpace(s) == false && ulong.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static float? ConvertToFloat(this string s)
        {
            float? retVal = null;
            float value;

            if (string.IsNullOrWhiteSpace(s) == false && float.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static double? ConvertToDouble(this string s)
        {
            double? retVal = null;
            double value;

            if (string.IsNullOrWhiteSpace(s) == false && double.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static decimal? ConvertToDecimal(this string s)
        {
            decimal? retVal = null;
            decimal value;

            if (string.IsNullOrWhiteSpace(s) == false && decimal.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static DateTime? ConvertToDateTime(this string s)
        {
            DateTime? retVal = null;
            DateTime value;

            if (string.IsNullOrWhiteSpace(s) == false && DateTime.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static DateTimeOffset? ConvertToDateTimeOffset(this string s)
        {
            DateTimeOffset? retVal = null;
            DateTimeOffset value;

            if (string.IsNullOrWhiteSpace(s) == false && DateTimeOffset.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }
    }
}
