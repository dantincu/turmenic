using System;

namespace Tncvd.Core.DataTypes
{
    public static partial class ConversionHelperMethods
    {
        #region ExtensionMethods

        public static bool? ConvertToBool(this string s)
        {
            bool? retVal = null;
            bool value;

            if (bool.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static byte? ConvertToByte(this string s)
        {
            byte? retVal = null;
            byte value;

            if (byte.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static sbyte? ConvertToSbyte(this string s)
        {
            sbyte? retVal = null;
            sbyte value;

            if (sbyte.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static short? ConvertToShort(this string s)
        {
            short? retVal = null;
            short value;

            if (short.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static ushort? ConvertToUshort(this string s)
        {
            ushort? retVal = null;
            ushort value;

            if (ushort.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static int? ConvertToInt(this string s)
        {
            int? retVal = null;
            int value;

            if (int.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static uint? ConvertToUint(this string s)
        {
            uint? retVal = null;
            uint value;

            if (uint.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static long? ConvertToLong(this string s)
        {
            long? retVal = null;
            long value;

            if (long.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static ulong? ConvertToUlong(this string s)
        {
            ulong? retVal = null;
            ulong value;

            if (ulong.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static float? ConvertToFloat(this string s)
        {
            float? retVal = null;
            float value;

            if (float.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static double? ConvertToDouble(this string s)
        {
            double? retVal = null;
            double value;

            if (double.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static decimal? ConvertToDecimal(this string s)
        {
            decimal? retVal = null;
            decimal value;

            if (decimal.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static DateTime? ConvertToDateTime(this string s)
        {
            DateTime? retVal = null;
            DateTime value;

            if (DateTime.TryParse(s, out value))
            {
                retVal = value;
            }

            return retVal;
        }

        public static DateTimeOffset? ConvertToDateTimeOffset(this string s)
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

        public static bool? ConvertToBoolFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToBool(s) : default;
        }

        public static byte? ConvertToByteFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToByte(s) : default;
        }

        public static sbyte? ConvertToSbyteFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToSbyte(s) : default;
        }

        public static short? ConvertToShortFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToShort(s) : default;
        }

        public static ushort? ConvertToUshortFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToUshort(s) : default;
        }

        public static int? ConvertToIntFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToInt(s) : default;
        }

        public static uint? ConvertToUintFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToUint(s) : default;
        }

        public static long? ConvertToLongFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToLong(s) : default;
        }

        public static ulong? ConvertToUlongFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToUlong(s) : default;
        }

        public static float? ConvertToFloatFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToFloat(s) : default;
        }

        public static double? ConvertToDoubleFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToDouble(s) : default;
        }

        public static decimal? ConvertToDecimalFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToDecimal(s) : default;
        }

        public static DateTime? ConvertToDateTimeFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToDateTime(s) : default;
        }

        public static DateTimeOffset? ConvertToDateTimeOffsetFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? ConvertToDateTimeOffset(s) : default;
        }
    }
}
