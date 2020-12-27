using System;
using System.Collections.Generic;
using System.Text;

namespace Tncvd.Components
{
    public abstract class InstanceContainerBase<T>
    {
        public virtual T Instance => this.InstanceCore;

        protected virtual T InstanceCore { get; set; }
    }

    public class DefaultConstructorInstanceContainer<T> : InstanceContainerBase<T> where T : new()
    {
        public override T Instance
        {
            get
            {
                if (this.InstanceCore == null)
                {
                    this.InstanceCore = new T();
                }

                return InstanceCore;
            }
        }
    }

    public class StaticInstanceContainer<T> where T : new()
    {
        private static T _instance;

        public static T Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new T();
                }

                return _instance;
            }
        }
    }
}
