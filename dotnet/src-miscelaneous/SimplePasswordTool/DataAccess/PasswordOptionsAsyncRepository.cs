using DataAccess;
using SimplePasswordTool.DataModels;

namespace SimplePasswordTool.DataAccess
{
    public class PasswordOptionsAsyncRepository : AsyncRepositoryBase<PasswordOptionsDataModel>
    {
        public PasswordOptionsAsyncRepository(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
        }
    }
}
