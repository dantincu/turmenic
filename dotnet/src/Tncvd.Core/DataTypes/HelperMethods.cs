using System;

namespace Tncvd.Core.DataTypes
{
    public static class HelperMethods
    {
        public static bool TryGetValueOrDefault(string input, bool defaultValue = default)
        {
            bool retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && bool.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static byte TryGetValueOrDefault(string input, byte defaultValue = default)
        {
            byte retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && byte.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static sbyte TryGetValueOrDefault(string input, sbyte defaultValue = default)
        {
            sbyte retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && sbyte.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static short TryGetValueOrDefault(string input, short defaultValue = default)
        {
            short retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && short.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static ushort TryGetValueOrDefault(string input, ushort defaultValue = default)
        {
            ushort retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && ushort.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static int TryGetValueOrDefault(string input, int defaultValue = default)
        {
            int retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && int.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static uint TryGetValueOrDefault(string input, uint defaultValue = default)
        {
            uint retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && uint.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static long TryGetValueOrDefault(string input, long defaultValue = default)
        {
            long retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && long.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static ulong TryGetValueOrDefault(string input, ulong defaultValue = default)
        {
            ulong retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && ulong.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static decimal TryGetValueOrDefault(string input, decimal defaultValue = default)
        {
            decimal retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && decimal.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static float TryGetValueOrDefault(string input, float defaultValue = default)
        {
            float retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && float.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static double TryGetValueOrDefault(string input, double defaultValue = default)
        {
            double retVal = defaultValue;

            if (string.IsNullOrWhiteSpace(input) == false && double.TryParse(input, out retVal) == false)
            {
                retVal = defaultValue;
            }

            return retVal;
        }

        public static DateTime TryGetValueOrDefault(string input, DateTime defaultValue = default)
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
