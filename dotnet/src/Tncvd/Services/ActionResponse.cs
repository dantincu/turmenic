using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.Services
{
    public class ActionResponse
    {
        public bool Success { get; set; }

        public string SuccessMessage { get; set; }

        public string ErrorMessage { get; set; }
    }

    public class ActionResponse<TData> : ActionResponse
    {
        public TData Data { get; set; }
    }

    public class StringActionResponse : ActionResponse<string>
    {
    }
}
