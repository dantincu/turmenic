using System;
using Turmenic.Core.AppConfig.ExecutionInfo;
using Turmenic.DataAccess.EntityFrameworkCore.Repository;
using Turmenic.Logging.Logger;
using Xunit;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.RepositoryUnitTests
{
    public class RepositoryUnitTestBase
    {
        protected readonly SharedFileLogger Logger;

        static RepositoryUnitTestBase()
        {
            AppExecutionInfoContainer.Instance.Register(typeof(RepositoryUnitTestBase).Assembly);
        }

        public RepositoryUnitTestBase()
        {
            this.Logger = LoggerFactory.Instance.GetSharedFileLogger(this.GetType());
        }
    }
}
