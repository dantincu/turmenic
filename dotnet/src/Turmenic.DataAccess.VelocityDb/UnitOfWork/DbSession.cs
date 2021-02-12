using System;
using VelocityDb.Session;

namespace Turmenic.DataAccess.VelocityDb.UnitOfWork
{
    public class DbSession : IDisposable
    {
        public DbSession(string dbSystemDirPath, bool createDatabaseSystem = false)
        {
            Session = new SessionNoServerShared(dbSystemDirPath);
            CreateDatabaseSystem = createDatabaseSystem;
        }

        public SessionNoServerShared Session { get; }

        public bool CreateDatabaseSystem { get; set; }

        public void Dispose()
        {
            Session.Dispose();
        }
    }
}
