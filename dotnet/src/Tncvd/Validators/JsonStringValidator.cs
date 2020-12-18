using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Tncvd.Validators
{
    public class JsonStringValidator
    {
        #region Fields

        private readonly char[] _stringDelimiterChars = new char[] { '\'', '"', '`' };

        #endregion Fields

        #region Methods

        public bool IsValidStringLiteral(string value)
        {
            bool retVal = _stringDelimiterChars.Any(c => value.StartsWith(c) && value.EndsWith(c));

            retVal = retVal && IsUnescaped(value) == false;
            return retVal;
        }

        private bool IsUnescaped(string value)
        {
            bool retVal = false;

            switch (value[0])
            {
                case '\'':
                    retVal = IsSingleQuoteUnescaped(value);
                    break;
                case '"':
                    retVal = IsDoubleQuoteUnescaped(value);
                    break;
                case '`':
                    retVal = IsTickUnescaped(value);
                    break;
                default:
                    throw new InvalidOperationException("Something went wrong...");
            }

            return retVal;
        }

        private bool IsTickUnescaped(string value)
        {
            value = GetSubstringWithoutMargins(value);
            value = RemoveDoubleTicksFromString(value);
            return value.Contains('`');
        }

        private string RemoveDoubleTicksFromString(string value)
        {
            return value.Replace("``", "");
        }

        private bool IsSingleQuoteUnescaped(string value)
        {
            value = GetSubstringWithoutMargins(value);
            value = RemoveBackSlashEscapedFromString(value, '\'');
            return value.Contains('\'');
        }

        private bool IsDoubleQuoteUnescaped(string value)
        {
            value = GetSubstringWithoutMargins(value);
            value = RemoveBackSlashEscapedFromString(value, '"');
            return value.Contains('"');
        }

        private string RemoveBackSlashEscapedFromString(string value, char quoteChar)
        {
            value = RemoveDoubleBackSlashesFromString(value);
            value = value.Replace($"\\{quoteChar}", "");

            return value;
        }

        private string RemoveDoubleBackSlashesFromString(string value)
        {
            return value.Replace(@"\\", "");
        }

        private string GetSubstringWithoutMargins(string value, int marginLength = 1)
        {
            return value.Substring(marginLength, value.Length - marginLength * 2);
        }

        #endregion Methods
    }
}
