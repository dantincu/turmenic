using System;
using Turmerik.Core.AppConfig.ExecutionInfo;

namespace Turmerik.Logging.Logger
{
    public static partial class HelperMethods
    {
        public static string GetLoggerFileName()
        {
            string fileName = string.Format(
                ConstantValues.LOGGER_FILE_NAME_FORMAT,
                AppExecutionInfoContainer.Instance.Info.AppExecutionStartTimeTicks,
                AppExecutionInfoContainer.Instance.Info.AppExecutionId);

            return fileName;
        }

        public static string GetBulkLoggerFileName(DateTime dateTimeCreated)
        {
            string fileName = string.Format(
                ConstantValues.BULK_LOGGER_FILE_NAME_FORMAT,
                dateTimeCreated.Ticks,
                AppExecutionInfoContainer.Instance.Info.AppExecutionId);

            return fileName;
        }
    }
}
