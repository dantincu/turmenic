using System;
using VelocityDb.Session;

namespace DataAccess
{
    public class DbSession : IDisposable
    {
        public DbSession(string dbSystemDirPath, bool createDatabaseSystem = false)
        {
            this.Session = new SessionNoServerShared(dbSystemDirPath);
            this.CreateDatabaseSystem = createDatabaseSystem;
        }

        public SessionNoServerShared Session { get; }

        public bool CreateDatabaseSystem { get; set; }

        public void Dispose()
        {
            this.Session.Dispose();
        }
    }
}
