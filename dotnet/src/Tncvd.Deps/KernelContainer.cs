using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.Deps
{
    public class KernelContainer
    {
        private static KernelContainer _instance;

        private readonly Ninject.StandardKernel _kernel;

        private KernelContainer()
        {
            this._kernel = new Ninject.StandardKernel();
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

        public Ninject.StandardKernel Kernel => this._kernel;
    }
}
