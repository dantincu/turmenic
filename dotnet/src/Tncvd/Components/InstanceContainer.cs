using System;
using System.Collections.Generic;
using System.Text;

namespace Tncvd.Components
{
    public class InstanceContainer<T> where T : new()
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
