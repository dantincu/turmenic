using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Execution;

namespace Tncvd.Console.App.AppConfig
{
    public class AppExecutionInfo : AppExecutionInfoBase
    {
        public static void Register()
        {
            AppExecutionInfoContainer.Instance.Register<AppExecutionInfo>();
        }
    }
}
