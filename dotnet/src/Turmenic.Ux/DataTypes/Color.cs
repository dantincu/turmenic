using System;

namespace Turmenic.Ux.DataTypes
{
    public struct ColorReadonly
    {
        public ColorReadonly(Color color)
        {
            color = color ?? throw new ArgumentNullException(nameof(color));

            this.Alpha = color.Alpha;
            this.Red = color.Red;
            this.Green = color.Green;
            this.Blue = color.Blue;
        }

        public byte Alpha { get; }
        public byte Red { get; }
        public byte Green { get; }
        public byte Blue { get; }

        public override bool Equals(object obj)
        {
            ColorReadonly comparand;
            bool retVal = obj?.GetType() == typeof(ColorReadonly);

            if (retVal)
            {
                comparand = (ColorReadonly)obj;

                retVal = retVal && this.Alpha == comparand.Alpha;
                retVal = retVal && this.Red == comparand.Red;
                retVal = retVal && this.Green == comparand.Green;
                retVal = retVal && this.Blue == comparand.Blue;
            }

            return retVal;
        }

        public override int GetHashCode()
        {
            int hashCode = this.Alpha;
            hashCode += this.Red * 13;
            hashCode += this.Green * 37;
            hashCode += this.Blue * 83;

            return hashCode;
        }

        public static bool operator ==(ColorReadonly leftItem, ColorReadonly rightItem)
        {
            bool retVal = leftItem.Equals(rightItem);
            return retVal;
        }

        public static bool operator !=(ColorReadonly leftItem, ColorReadonly rightItem)
        {
            bool retVal = leftItem.Equals(rightItem);
            return retVal == false;
        }
    }

    public class Color
    {
        public Color()
        {
        }

        public Color(Color prototype)
        {
            prototype = prototype ?? throw new ArgumentNullException(nameof(prototype));

            this.Alpha = prototype.Alpha;
            this.Red = prototype.Red;
            this.Green = prototype.Green;
            this.Blue = prototype.Blue;
        }

        public byte Alpha { get; set; }
        public byte Red { get; set; }
        public byte Green { get; set; }
        public byte Blue { get; set; }

        public override bool Equals(object obj)
        {
            bool retVal = false;
            Color comparand = obj as Color;

            if (comparand != null)
            {
                retVal = retVal && this.Alpha == comparand.Alpha;
                retVal = retVal && this.Red == comparand.Red;
                retVal = retVal && this.Green == comparand.Green;
                retVal = retVal && this.Blue == comparand.Blue;
            }

            return retVal;
        }

        public override int GetHashCode()
        {
            int hashCode = this.Alpha;
            hashCode += this.Red * 13;
            hashCode += this.Green * 37;
            hashCode += this.Blue * 83;

            return hashCode;
        }

        public static bool operator ==(Color leftItem, Color rightItem)
        {
            bool retVal = (leftItem == null && rightItem == null);

            if (retVal == false)
            {
                if (leftItem != null && rightItem != null)
                {
                    retVal = leftItem.Equals(rightItem);
                }
            }
            
            return retVal;
        }

        public static bool operator !=(Color leftItem, Color rightItem)
        {
            bool retValN = (leftItem == null && rightItem == null);

            if (retValN == false)
            {
                if (leftItem != null && rightItem != null)
                {
                    retValN = leftItem.Equals(rightItem);
                }
            }

            return retValN == false;
        }
    }
}
