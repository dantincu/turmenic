namespace Tncvd.Core.Components
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

        public TVal Val => this.Data.Val;

        public TVal AltVal => this.Data.AltVal;
    }
}
