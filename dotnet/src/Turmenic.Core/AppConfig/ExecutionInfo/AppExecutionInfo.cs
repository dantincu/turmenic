using System;
using Turmenic.Core.DataTypes;

namespace Turmenic.Core.AppConfig.ExecutionInfo
{
    public class AppExecutionInfoSrlz
    {
        public Guid AppExecutionId { get; set; }

        public DateTime AppExecutionStartTime { get; set; }

        public long AppExecutionStartTimeTicks { get; set; }

        public string AppExecutionStartAssemblyName { get; set; }
    }

    public class AppExecutionInfo : ReadonlyData<AppExecutionInfoSrlz>
    {
        public AppExecutionInfo(AppExecutionInfoSrlz data) : base(data)
        {
        }

        public Guid AppExecutionId => this.Data.AppExecutionId;

        public DateTime AppExecutionStartTime => this.Data.AppExecutionStartTime;

        public long AppExecutionStartTimeTicks => this.Data.AppExecutionStartTimeTicks;

        public string AppExecutionStartAssemblyName => this.Data.AppExecutionStartAssemblyName;
    }
}
