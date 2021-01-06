using System;

namespace Common.DataTypes
{
    public static partial class ParseHelperMethods
    {
        #region ExtensionMethods

        public static Tuple<bool, bool> TryParseBool(this string s)
        {
            bool value;
            bool success = bool.TryParse(s, out value);

            return new Tuple<bool, bool>(success, value);
        }

        public static Tuple<bool, byte> TryParseByte(this string s)
        {
            byte value;
            bool success = byte.TryParse(s, out value);

            return new Tuple<bool, byte>(success, value);
        }

        public static Tuple<bool, sbyte> TryParseSbyte(this string s)
        {
            sbyte value;
            bool success = sbyte.TryParse(s, out value);

            return new Tuple<bool, sbyte>(success, value);
        }

        public static Tuple<bool, short> TryParseShort(this string s)
        {
            short value;
            bool success = short.TryParse(s, out value);

            return new Tuple<bool, short>(success, value);
        }

        public static Tuple<bool, ushort> TryParseUshort(this string s)
        {
            ushort value;
            bool success = ushort.TryParse(s, out value);

            return new Tuple<bool, ushort>(success, value);
        }

        public static Tuple<bool, int> TryParseInt(this string s)
        {
            int value;
            bool success = int.TryParse(s, out value);

            return new Tuple<bool, int>(success, value);
        }

        public static Tuple<bool, uint> TryParseUint(this string s)
        {
            uint value;
            bool success = uint.TryParse(s, out value);

            return new Tuple<bool, uint>(success, value);
        }

        public static Tuple<bool, long> TryParseLong(this string s)
        {
            long value;
            bool success = long.TryParse(s, out value);

            return new Tuple<bool, long>(success, value);
        }

        public static Tuple<bool, ulong> TryParseUlong(this string s)
        {
            ulong value;
            bool success = ulong.TryParse(s, out value);

            return new Tuple<bool, ulong>(success, value);
        }

        public static Tuple<bool, float> TryParseFloat(this string s)
        {
            float value;
            bool success = float.TryParse(s, out value);

            return new Tuple<bool, float>(success, value);
        }

        public static Tuple<bool, double> TryParseDouble(this string s)
        {
            double value;
            bool success = double.TryParse(s, out value);

            return new Tuple<bool, double>(success, value);
        }

        public static Tuple<bool, decimal> TryParseDecimal(this string s)
        {
            decimal value;
            bool success = decimal.TryParse(s, out value);

            return new Tuple<bool, decimal>(success, value);
        }

        public static Tuple<bool, DateTime> TryParseDateTime(this string s)
        {
            DateTime value;
            bool success = DateTime.TryParse(s, out value);

            return new Tuple<bool, DateTime>(success, value);
        }

        public static Tuple<bool, DateTimeOffset> TryParseDateTimeOffset(this string s)
        {
            DateTimeOffset value;
            bool success = DateTimeOffset.TryParse(s, out value);

            return new Tuple<bool, DateTimeOffset>(success, value);
        }

        #endregion ExtensionMethods

        public static Tuple<bool, bool> TryParseBoolFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseBool(s) : default;
        }

        public static Tuple<bool, byte> TryParseByteFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseByte(s) : default;
        }

        public static Tuple<bool, sbyte> TryParseSbyteFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseSbyte(s) : default;
        }

        public static Tuple<bool, short> TryParseShortFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseShort(s) : default;
        }

        public static Tuple<bool, ushort> TryParseUshortFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseUshort(s) : default;
        }

        public static Tuple<bool, int> TryParseIntFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseInt(s) : default;
        }

        public static Tuple<bool, uint> TryParseUintFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseUint(s) : default;
        }

        public static Tuple<bool, long> TryParseLongFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseLong(s) : default;
        }

        public static Tuple<bool, ulong> TryParseUlongFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseUlong(s) : default;
        }

        public static Tuple<bool, float> TryParseFloatFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseFloat(s) : default;
        }

        public static Tuple<bool, double> TryParseDoubleFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseDouble(s) : default;
        }

        public static Tuple<bool, decimal> TryParseDecimalFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseDecimal(s) : default;
        }

        public static Tuple<bool, DateTime> TryParseDateTimeFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseDateTime(s) : default;
        }

        public static Tuple<bool, DateTimeOffset> TryParseDateTimeOffsetFromString(string s)
        {
            return string.IsNullOrWhiteSpace(s) ? TryParseDateTimeOffset(s) : default;
        }
    }
}
