using Tncvd.Core.Serialization;
using System;
using System.Linq;
using Tncvd.Ux.DataTypes;

namespace Tncvd.Ux.DataTypes
{
    public static partial class HelperMethods
    {
        public static string ToHexCode(this Color color, bool includeAlpha = true, bool includeHashSymbol = false)
        {
            string hexCode = new byte[] {
                color.Alpha,
                color.Red,
                color.Green,
                color.Blue
            }.ToHexCode();

            if (includeHashSymbol)
            {
                hexCode = string.Concat("#", hexCode);
            }

            return hexCode;
        }

        public static Color HexCodeToColor(this string hexCode)
        {
            bool hasAlpha, isSingleDigitCode;

            ValidateHexCode(ref hexCode);
            SetHexCodeParams(hexCode, out hasAlpha, out isSingleDigitCode);
            NormalizeHexCode(ref hexCode, hasAlpha, isSingleDigitCode);

            Color color = HexCodeToColorCore(hexCode, hasAlpha, isSingleDigitCode);
            return color;
        }

        public static ColorReadonly HexCodeToColorReadonly(this string hexCode)
        {
            Color color = hexCode.HexCodeToColor();
            ColorReadonly colorReadonly = new ColorReadonly(color);

            return colorReadonly;
        }

        #region Private

        private static Color HexCodeToColorCore(string hexCode, bool hasAlpha, bool isSingleDigitCode)
        {
            byte[] byteArray = hexCode.GetByteArrayFromHexCode();

            Color color = new Color();
            int idx = 0;

            if (hasAlpha)
            {
                color.Alpha = byteArray[idx++];
            }

            color.Red = byteArray[idx++];
            color.Green = byteArray[idx++];
            color.Blue = byteArray[idx++];

            return color;
        }

        private static void NormalizeHexCode(ref string hexCode, bool hasAlpha, bool isSingleDigitCode)
        {
            if (isSingleDigitCode)
            {
                hexCode = hexCode.ToCharArray().Select(c => string.Concat(c, c)).Aggregate((leftStr, rightStr) => string.Concat(leftStr, rightStr));
            }
        }

        private static void SetHexCodeParams(string hexCode, out bool hasAlpha, out bool isSingleDigitCode)
        {
            switch (hexCode.Length)
            {
                case 3:
                    hasAlpha = false;
                    isSingleDigitCode = true;
                    break;
                case 4:
                    hasAlpha = true;
                    isSingleDigitCode = true;
                    break;
                case 6:
                    hasAlpha = false;
                    isSingleDigitCode = false;
                    break;
                case 8:
                    hasAlpha = true;
                    isSingleDigitCode = true;
                    break;
                default:
                    throw new ArgumentException(nameof(hexCode));
            }
        }

        private static void ValidateHexCode(ref string hexCode)
        {
            if (string.IsNullOrWhiteSpace(hexCode))
            {
                throw new ArgumentNullException(nameof(hexCode));
            }

            hexCode = hexCode.Trim().TrimStart('#');
        }

        #endregion Private
    }
}
