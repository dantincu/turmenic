using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.AppConfig.Execution
{
    public class AppExecutionInfoContainer
    {
        private static AppExecutionInfoContainer _instance;

        private AppExecutionInfoBase _info;

        private AppExecutionInfoContainer()
        {
        }

        public static AppExecutionInfoContainer Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new AppExecutionInfoContainer();
                }

                return _instance;
            }
        }

        public AppExecutionInfoBase Info
        {
            get
            {
                this.AssureRegistered();

                return this._info;
            }
        }

        public void Register(AppExecutionInfoBase info)
        {
            this.AssureNotRegistered();

            this._info = info;
        }

        public void Register<T>() where T : AppExecutionInfoBase
        {
            this.AssureNotRegistered();

            this._info = Activator.CreateInstance<T>();
        }

        private void AssureNotRegistered()
        {
            if (this._info != null)
            {
                throw new InvalidOperationException("The application execution info has already been registered! It cannot be registered twice!");
            }
        }

        private void AssureRegistered()
        {
            if (this._info == null)
            {
                throw new InvalidOperationException("The application execution info has not yet been registered!");
            }
        }
    }
}
