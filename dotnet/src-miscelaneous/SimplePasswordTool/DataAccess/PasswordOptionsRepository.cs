using DataAccess;
using SimplePasswordTool.DataModels;

namespace SimplePasswordTool.DataAccess
{
    public class PasswordOptionsRepository : RepositoryBase<PasswordOptionsDataModel>
    {
        public PasswordOptionsRepository(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
        }
    }
}
