using Turmenic.DataAccess.VelocityDb.Repository;
using SimplePasswordTool.DataModels;
using Turmenic.DataAccess.VelocityDb.UnitOfWork;

namespace SimplePasswordTool.DataAccess
{
    public class PasswordOptionsAsyncRepository : AsyncRepositoryBase<PasswordOptionsDataModel>
    {
        public PasswordOptionsAsyncRepository(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
        }
    }
}
