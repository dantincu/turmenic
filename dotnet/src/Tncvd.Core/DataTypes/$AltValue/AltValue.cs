namespace Tncvd.Core.DataTypes
{
    public class AltValueSrlz<TVal>
    {
        public TVal Val { get; set; }

        public TVal AltVal { get; set; }
    }

    public class AltValue<TVal> : ReadonlyData<AltValueSrlz<TVal>>
    {
        public AltValue(AltValueSrlz<TVal> data) : base(data)
        {
        }

        public TVal Val => Data.Val;

        public TVal AltVal => Data.AltVal;
    }
}
