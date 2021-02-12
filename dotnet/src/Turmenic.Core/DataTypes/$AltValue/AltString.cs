namespace Turmenic.Core.DataTypes
{
    public class AltStringSrlz : AltValueSrlz<string>
    {
    }

    public class AltString : AltValue<string>
    {
        public AltString(AltStringSrlz data) : base(data)
        {
        }
    }
}
