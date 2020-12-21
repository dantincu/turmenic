using System;
using System.Collections.Generic;
using System.Text;

namespace Tncvd.Text
{
    public static class HelperMethods
    {
        #region Extensions
        public static string FirstLetterToUpper(this string value)
        {
            char firstLetter = value[0];

            if (char.IsLetter(firstLetter) && char.IsLower(firstLetter))
            {
                firstLetter = char.ToUpper(firstLetter);
                value = value.Substring(1);
                value = $"{firstLetter}{value}";
            }

            return value;
        }

        public static string FirstLetterToLower(this string value)
        {
            char firstLetter = value[0];

            if (char.IsLetter(firstLetter) && char.IsUpper(firstLetter))
            {
                firstLetter = char.ToLower(firstLetter);
                value = value.Substring(1);
                value = $"{firstLetter}{value}";
            }

            return value;
        }

        #endregion Extensions
    }
}
