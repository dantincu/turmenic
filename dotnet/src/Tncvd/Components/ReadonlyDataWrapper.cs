using System;
using System.Collections.Generic;
using System.Text;

namespace Tncvd.Components
{
    public interface IReadonlyDataWrapper
    {
    }

    public class ReadonlyDataWrapper<TData> : IReadonlyDataWrapper
    {
        public ReadonlyDataWrapper(TData data)
        {
            this.Data = data;
        }

        protected TData Data { get; }
    }
}
