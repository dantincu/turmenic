using System;

namespace Turmerik.Core.DataTypes
{
    public class ReadonlyData<TData>
    {
        public ReadonlyData(TData data)
        {
            Data = data ?? throw new ArgumentNullException(nameof(data));
        }

        protected TData Data { get; }
    }
}
