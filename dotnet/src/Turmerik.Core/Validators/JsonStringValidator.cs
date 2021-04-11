using System;
using System.Linq;

namespace Turmerik.Core.Validators
{
    public class JsonStringValidator
    {
        #region Fields

        private readonly char[] _stringDelimiterChars = new char[] { '\'', '"', '`' };

        #endregion Fields

        #region Methods

        public bool IsValidStringLiteral(string value)
        {
            bool retVal = this._stringDelimiterChars.Any(c => value.StartsWith(c) && value.EndsWith(c));

            retVal = retVal && this.IsUnescaped(value) == false;
            return retVal;
        }

        private bool IsUnescaped(string value)
        {
            bool retVal = false;

            switch (value[0])
            {
                case '\'':
                    retVal = this.IsSingleQuoteUnescaped(value);
                    break;
                case '"':
                    retVal = this.IsDoubleQuoteUnescaped(value);
                    break;
                case '`':
                    retVal = this.IsTickUnescaped(value);
                    break;
                default:
                    throw new InvalidOperationException("Something went wrong...");
            }

            return retVal;
        }

        private bool IsTickUnescaped(string value)
        {
            value = this.GetSubstringWithoutMargins(value);
            value = this.RemoveDoubleTicksFromString(value);
            return value.Contains('`');
        }

        private string RemoveDoubleTicksFromString(string value)
        {
            return value.Replace("``", string.Empty);
        }

        private bool IsSingleQuoteUnescaped(string value)
        {
            value = this.GetSubstringWithoutMargins(value);
            value = this.RemoveBackSlashEscapedFromString(value, '\'');
            return value.Contains('\'');
        }

        private bool IsDoubleQuoteUnescaped(string value)
        {
            value = this.GetSubstringWithoutMargins(value);
            value = this.RemoveBackSlashEscapedFromString(value, '"');
            return value.Contains('"');
        }

        private string RemoveBackSlashEscapedFromString(string value, char quoteChar)
        {
            value = this.RemoveDoubleBackSlashesFromString(value);
            value = value.Replace($"\\{quoteChar}", string.Empty);

            return value;
        }

        private string RemoveDoubleBackSlashesFromString(string value)
        {
            return value.Replace(@"\\", string.Empty);
        }

        private string GetSubstringWithoutMargins(string value, int marginLength = 1)
        {
            return value.Substring(marginLength, value.Length - marginLength * 2);
        }

        #endregion Methods
    }
}
