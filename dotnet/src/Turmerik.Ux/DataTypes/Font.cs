using System;
using Turmerik.Core.DataTypes;

namespace Turmerik.Ux.DataTypes
{
    public enum FontStyle
    {
        None = 0,
        Italic = 1,
        Bold = 2,
        Underline = 4,
        StrikeThrough = 8
    }

    public class FontReadonly : ReadonlyData<Font>
    {
        public FontReadonly(Font data) : base(data)
        {
            this.FontColor = data.FontColor != null ? new ColorReadonly(data.FontColor) : default;
            this.HighlightColor = data.FontColor != null ? new ColorReadonly(data.HighlightColor) : default;
        }

        public string FontFamilyName => this.Data.FontFamilyName;
        public decimal FontSize => this.Data.FontSize;
        public FontStyle FontStyle => this.Data.FontStyle;
        public ColorReadonly FontColor { get; }
        public ColorReadonly HighlightColor { get; }

        public override bool Equals(object obj)
        {
            return this.Data.Equals(obj);
        }

        public override int GetHashCode()
        {
            return this.Data.GetHashCode();
        }

        public Font GetData()
        {
            return this.Data;
        }

        public static bool operator ==(FontReadonly leftItem, FontReadonly rightItem)
        {
            bool retVal = object.ReferenceEquals(leftItem, rightItem);
            return retVal;
        }

        public static bool operator !=(FontReadonly leftItem, FontReadonly rightItem)
        {
            bool retValN = object.ReferenceEquals(leftItem, rightItem);
            return retValN == false;
        }
    }

    public class Font
    {
        public Font()
        {
        }

        public Font(Font prototype)
        {
            prototype = prototype ?? throw new ArgumentNullException(nameof(prototype));

            this.FontFamilyName = prototype.FontFamilyName;
            this.FontSize = prototype.FontSize;
            this.FontStyle = prototype.FontStyle;
            this.FontColor = prototype.FontColor;
            this.HighlightColor = prototype.HighlightColor;
        }

        public string FontFamilyName { get; set; }
        public decimal FontSize { get; set; }
        public FontStyle FontStyle { get; set; }
        public Color FontColor { get; set; }
        public Color HighlightColor { get; set; }

        public override bool Equals(object obj)
        {
            bool retVal = false;
            Font comparand = obj as Font;

            if (comparand != null)
            {
                retVal = retVal && this.FontFamilyName == comparand.FontFamilyName;
                retVal = retVal && this.FontSize == comparand.FontSize;
                retVal = retVal && this.FontStyle == comparand.FontStyle;
                retVal = retVal && this.FontColor == comparand.FontColor;
                retVal = retVal && this.HighlightColor == comparand.HighlightColor;
            }

            return retVal;
        }

        public override int GetHashCode()
        {
            int hashCode = (this.FontFamilyName?.GetHashCode() ?? 0);
            hashCode += this.FontSize.GetHashCode() * 7;
            hashCode += this.FontStyle.GetHashCode() * 13;
            hashCode += (this.FontColor?.GetHashCode() ?? 0) * 17;
            hashCode += (this.HighlightColor?.GetHashCode() ?? 0) * 23;

            return hashCode;
        }

        public static bool operator ==(Font leftItem, Font rightItem)
        {
            bool retVal = object.ReferenceEquals(leftItem, rightItem);
            return retVal;
        }

        public static bool operator !=(Font leftItem, Font rightItem)
        {
            bool retValN = object.ReferenceEquals(leftItem, rightItem);
            return retValN == false;
        }
    }
}
