using System;

namespace Turmerik.Deps
{
    public class KernelContainer : IDisposable
    {
        private static KernelContainer _instance;

        private readonly Ninject.StandardKernel kernel;

        private bool disposed;

        private KernelContainer()
        {
            this.kernel = new Ninject.StandardKernel();
            this.disposed = false;
        }

        public static KernelContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new KernelContainer();
                }

                return _instance;
            }
        }

        public Ninject.StandardKernel Kernel => kernel;

        public void Dispose()
        {
            if (this.disposed == false)
            {
                this.DisposeCore();
                this.disposed = true;
            }
        }

        protected void DisposeCore()
        {
            this.kernel.Dispose();
        }
    }
}
