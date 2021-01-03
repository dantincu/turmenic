using System;
using VelocityDb.Session;

namespace DataAccess
{
    public class DbSession : IDisposable
    {
        public DbSession(string dbSystemDirPath, bool createDatabaseSystem = false)
        {
            this.Session = new SessionNoServer(dbSystemDirPath);
            this.CreateDatabaseSystem = createDatabaseSystem;
        }

        public SessionNoServer Session { get; }

        public bool CreateDatabaseSystem { get; set; }

        public void Dispose()
        {
            this.Session.Dispose();
        }
    }
}
