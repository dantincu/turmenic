using System;

namespace Turmenic.Core.DataTypes
{
    public static partial class ConversionHelperMethods
    {
        public static bool ConvertToValueOrDefault(string input, bool defaultValue = default)
        {
            bool retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && bool.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static byte ConvertToValueOrDefault(string input, byte defaultValue = default)
        {
            byte retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && byte.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static sbyte ConvertToValueOrDefault(string input, sbyte defaultValue = default)
        {
            sbyte retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && sbyte.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static short ConvertToValueOrDefault(string input, short defaultValue = default)
        {
            short retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && short.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static ushort ConvertToValueOrDefault(string input, ushort defaultValue = default)
        {
            ushort retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && ushort.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static int ConvertToValueOrDefault(string input, int defaultValue = default)
        {
            int retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && int.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static uint ConvertToValueOrDefault(string input, uint defaultValue = default)
        {
            uint retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && uint.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static long ConvertToValueOrDefault(string input, long defaultValue = default)
        {
            long retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && long.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static ulong ConvertToValueOrDefault(string input, ulong defaultValue = default)
        {
            ulong retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && ulong.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static decimal ConvertToValueOrDefault(string input, decimal defaultValue = default)
        {
            decimal retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && decimal.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static float ConvertToValueOrDefault(string input, float defaultValue = default)
        {
            float retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && float.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static double ConvertToValueOrDefault(string input, double defaultValue = default)
        {
            double retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && double.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static DateTime ConvertToValueOrDefault(string input, DateTime defaultValue = default)
        {
            DateTime retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && DateTime.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }
    }
}
