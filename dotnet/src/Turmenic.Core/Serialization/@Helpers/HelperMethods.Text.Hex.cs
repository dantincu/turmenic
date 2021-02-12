using System;
using System.Linq;
using System.Text;
using Turmenic.Core.Math;

namespace Turmenic.Core.Serialization
{
    public static partial class HelperMethods
    {
        public static string GetHexFormatCode(bool upperCase)
        {
            string code = upperCase ? ConstantValues.INT_TO_HEX_FORMAT_CODE_UPPERCASE : ConstantValues.INT_TO_HEX_FORMAT_CODE_LOWERCASE;
            return code;
        }

        public static string ToHexCode(this byte[] byteArr, bool upperCase = false)
        {
            string[] hexCodeArr = byteArr.Select(bt => bt.ToHexCode(upperCase)).ToArray();
            string hexCode = string.Concat(hexCodeArr);

            return hexCode;
        }

        public static string ToHexCode(this byte value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static string ToHexCode(this sbyte value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static string ToHexCode(this short value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static string ToHexCode(this ushort value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static string ToHexCode(this int value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static string ToHexCode(this uint value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static string ToHexCode(this long value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static string ToHexCode(this ulong value, bool upperCase = false)
        {
            string hexFormatCode = GetHexFormatCode(upperCase);
            string hexCode = value.ToString(hexFormatCode);
            return hexCode;
        }

        public static int GetShortFromHexCode(this string hexCode)
        {
            ulong val = GetULongFromHexCode(hexCode);
            short retVal = Convert.ToInt16(val);

            return retVal;
        }

        public static ushort GetUShortFromHexCode(this string hexCode)
        {
            ValidateNormalizeHexCode(ref hexCode, 4);
            byte[] bytes = hexCode.Select(c => c.GetDigitFromHexChar()).ToArray();

            ushort retVal = bytes.ByteArrayToUShort(16);
            return retVal;
        }

        public static int GetIntFromHexCode(this string hexCode)
        {
            uint val = GetUIntFromHexCode(hexCode);
            int retVal = Convert.ToInt32(val);

            return retVal;
        }

        public static uint GetUIntFromHexCode(this string hexCode)
        {
            ValidateNormalizeHexCode(ref hexCode, 8);
            byte[] bytes = hexCode.Select(c => c.GetDigitFromHexChar()).ToArray();

            uint retVal = bytes.ByteArrayToUInt(16);
            return retVal;
        }

        public static long GetLongFromHexCode(this string hexCode)
        {
            ulong val = GetULongFromHexCode(hexCode);
            long retVal = Convert.ToInt64(val);

            return retVal;
        }

        public static ulong GetULongFromHexCode(this string hexCode)
        {
            ValidateNormalizeHexCode(ref hexCode, 16);
            byte[] bytes = hexCode.Select(c => c.GetDigitFromHexChar()).ToArray();

            ulong retVal = bytes.ByteArrayToULong(16);
            return retVal;
        }

        public static sbyte GetSByteFromHexCode(this string hexCode)
        {
            byte val = GetByteFromHexCode(hexCode);
            sbyte retVal = Convert.ToSByte(val);

            return retVal;
        }

        public static byte[] GetByteArrayFromHexCode(this string hexCode)
        {
            ValidateNormalizeHexCode(ref hexCode, 0);
            byte[] retArr = GetByteArrayFromHexCodeCore(hexCode);

            return retArr;
        }

        public static byte GetByteFromHexCode(this string hexCode)
        {
            ValidateNormalizeHexCode(ref hexCode, 2);

            byte retVal = GetByteFromHexCodeCore(hexCode);
            return retVal;
        }

        public static byte GetDigitFromHexChar(this char hexChar)
        {
            bool isDigit;

            ValidateNormalizeHexChar(ref hexChar, out isDigit);
            byte retVal = GetDigitFromHexCharCore(hexChar, isDigit);

            return retVal;
        }

        public static bool IsValidHexChar(this char hexChar)
        {
            bool isDigit;
            bool isValid = IsValidHexChar(hexChar, out isDigit);

            return isValid;
        }

        public static bool IsValidHexChar(this char hexChar, out bool isDigit)
        {
            isDigit = char.IsDigit(hexChar);
            bool isValid = isDigit || IsValidHexLetter(hexChar);

            return isValid;
        }

        public static bool IsValidHexLetter(this char hexLetter)
        {
            bool isValid = IsValidHexLowercase(char.ToLower(hexLetter));
            return isValid;
        }

        #region Private

        private static byte[] GetByteArrayFromHexCodeCore(string hexCode)
        {
            int retArrLen = GetByteArrLenFromHexCodeLen(hexCode.Length);
            byte[] retArr = new byte[retArrLen];

            for (int i = retArr.Length - 1; i >= 0; i--)
            {
                retArr[i] = GetByteFromHexCodeCore(hexCode.Substring(i * 2, 2));
            }

            return retArr;
        }

        private static byte GetByteFromHexCodeCore(string hexCode)
        {
            byte[] bytes = hexCode.Select(c => GetDigitFromHexCharCore(c)).ToArray();

            byte retVal = (byte)(bytes[0] * 16 + bytes[1]);
            return retVal;
        }

        private static byte GetDigitFromHexCharCore(char hexChar)
        {
            byte retVal = GetDigitFromHexCharCore(hexChar, char.IsDigit(hexChar));
            return retVal;
        }

        private static byte GetDigitFromHexCharCore(char hexChar, bool isDigit)
        {
            byte retVal;

            if (isDigit)
            {
                retVal = (byte)(hexChar - '0');
            }
            else
            {
                retVal = (byte)(10 + hexChar - 'a');
            }

            return retVal;
        }

        #region Private Validation

        private static int GetByteArrLenFromHexCodeLen(int hexCodeLength)
        {
            int retVal = hexCodeLength / 2;
            retVal += hexCodeLength % 2;

            return retVal;
        }

        private static bool IsValidHexLowercase(char hexLowercase)
        {
            bool isValid = hexLowercase >= 'a' && hexLowercase <= 'f';
            return isValid;
        }

        private static bool IsValidHexLowercaseChar(char hexChar, out bool isDigit)
        {
            isDigit = char.IsDigit(hexChar);
            bool isValid = isDigit || IsValidHexLowercase(hexChar);

            return isValid;
        }

        private static void ValidateNormalizeHexChar(ref char hexChar, out bool isDigit)
        {
            hexChar = char.ToLower(hexChar);
            ValidateHexChar(hexChar, out isDigit);
        }

        private static void ValidateHexChar(char hexChar, out bool isDigit)
        {
            if (IsValidHexLowercaseChar(hexChar, out isDigit) == false)
            {
                throw new ArgumentException(nameof(hexChar));
            }
        }

        private static void ValidateNormalizeHexCode(ref string hexCode, int paddCount, bool toLowerCase = true)
        {
            if (hexCode == null)
            {
                throw new ArgumentNullException(nameof(hexCode));
            }

            hexCode = hexCode.Trim();

            if (paddCount > 0 && hexCode.Length > paddCount)
            {
                hexCode = hexCode.Substring(hexCode.Length - paddCount, hexCode.Length);
            }
            else if (hexCode.Length < paddCount)
            {
                hexCode = hexCode.PadLeft(paddCount, '0');
            }

            if (toLowerCase)
            {
                hexCode = hexCode.ToLower();
            }
        }

        #endregion Private Validation

        #endregion Private
    }
}
