using System;

namespace Tncvd.Core.Components
{
    public class ReadonlyData<TData>
    {
        public ReadonlyData(TData data)
        {
            this.Data = data ?? throw new ArgumentNullException(nameof(data));
        }

        protected TData Data { get; }
    }
}
