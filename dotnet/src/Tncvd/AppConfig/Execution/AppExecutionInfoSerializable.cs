using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Execution
{
    [Serializable]
    public class AppExecutionInfoSerializable
    {
        public Guid AppExecutionId { get; set; }

        public DateTime AppExecutionStartTime { get; set; }

        public long AppExecutionStartTimeTicks { get; set; }

        public string AppExecutionStartAssemblyName { get; set; }

        public string TncvdEnvLocationPath { get; set; }
    }
}
