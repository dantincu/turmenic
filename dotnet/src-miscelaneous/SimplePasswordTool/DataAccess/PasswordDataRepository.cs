using DataAccess;
using SimplePasswordTool.DataModels;

namespace SimplePasswordTool.DataAccess
{
    public class PasswordDataRepository : RepositoryBase<PasswordDataModel>
    {
        public PasswordDataRepository(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
        }
    }
}
