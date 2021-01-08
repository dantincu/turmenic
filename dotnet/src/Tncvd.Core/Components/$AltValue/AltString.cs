namespace Tncvd.Core.Components
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
