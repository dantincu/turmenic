using System;

namespace Common.DataTypes
{
    public static partial class ConversionHelperMethods
    {
        #region ExtensionMethods

        public static bool? TryConvertToBool(this string s)
        {
            bool? retVal = null;
            bool value;

            if (bool.TryParse(s, out value)) {
                retVal = value;
            }

            return retVal;
        }

        public static byte? TryConvertToByte(this string s)
        {
            byte? retVal = null;
            byte value;

            if (byte.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static sbyte? TryConvertToSbyte(this string s)
        {
            sbyte? retVal = null;
            sbyte value;

            if (sbyte.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static short? TryConvertToShort(this string s)
        {
            short? retVal = null;
            short value;

            if (short.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static ushort? TryConvertToUshort(this string s)
        {
            ushort? retVal = null;
            ushort value;

            if (ushort.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static int? TryConvertToInt(this string s)
        {
            int? retVal = null;
            int value;

            if (int.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static uint? TryConvertToUint(this string s)
        {
            uint? retVal = null;
            uint value;

            if (uint.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static long? TryConvertToLong(this string s)
        {
            long? retVal = null;
            long value;

            if (long.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static ulong? TryConvertToUlong(this string s)
        {
            ulong? retVal = null;
            ulong value;

            if (ulong.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static float? TryConvertToFloat(this string s)
        {
            float? retVal = null;
            float value;

            if (float.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static double? TryConvertToDouble(this string s)
        {
            double? retVal = null;
            double value;

            if (double.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static decimal? TryConvertToDecimal(this string s)
        {
            decimal? retVal = null;
            decimal value;

            if (decimal.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static DateTime? TryConvertToDateTime(this string s)
        {
            DateTime? retVal = null;
            DateTime value;

            if (DateTime.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static DateTimeOffset? TryConvertToDateTimeOffset(this string s)
        {
            DateTimeOffset? retVal = null;
            DateTimeOffset value;

            if (DateTimeOffset.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        #endregion ExtensionMethods

        public static bool? TryConvertToBoolFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToBool(s) : default;
        }

        public static byte? TryConvertToByteFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToByte(s) : default;
        }

        public static sbyte? TryConvertToSbyteFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToSbyte(s) : default;
        }

        public static short? TryConvertToShortFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToShort(s) : default;
        }

        public static ushort? TryConvertToUshortFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToUshort(s) : default;
        }

        public static int? TryConvertToIntFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToInt(s) : default;
        }

        public static uint? TryConvertToUintFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToUint(s) : default;
        }

        public static long? TryConvertToLongFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToLong(s) : default;
        }

        public static ulong? TryConvertToUlongFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToUlong(s) : default;
        }

        public static float? TryConvertToFloatFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToFloat(s) : default;
        }

        public static double? TryConvertToDoubleFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToDouble(s) : default;
        }

        public static decimal? TryConvertToDecimalFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToDecimal(s) : default;
        }

        public static DateTime? TryConvertToDateTimeFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToDateTime(s) : default;
        }

        public static DateTimeOffset? TryConvertToDateTimeOffsetFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryConvertToDateTimeOffset(s) : default;
        }
    }
}
