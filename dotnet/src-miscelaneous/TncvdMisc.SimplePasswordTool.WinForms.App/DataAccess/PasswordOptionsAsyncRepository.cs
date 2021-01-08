using Tncvd.DataAccess.NoServer.Repository;
using SimplePasswordTool.DataModels;
using Tncvd.DataAccess.NoServer.UnitOfWork;

namespace SimplePasswordTool.DataAccess
{
    public class PasswordOptionsAsyncRepository : AsyncRepositoryBase<PasswordOptionsDataModel>
    {
        public PasswordOptionsAsyncRepository(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
        }
    }
}
