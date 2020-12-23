using System;
using System.Threading;
using Tncvd.Components;

namespace Tncvd.Threading
{
    public static class HelperMethods
    {
        public static Thread LaunchNewThread(ThreadStart threadStart)
        {
            Thread thread = new Thread(threadStart);
            thread.Start();
            return thread;
        }

        public static Thread LaunchNewThread(ParameterizedThreadStart threadStart, object threadStartArg)
        {
            Thread thread = new Thread(threadStart);
            thread.Start(threadStartArg);
            return thread;
        }

        public static Thread LaunchNewThread(ThreadStart threadStart, int maxStackSize)
        {
            Thread thread = new Thread(threadStart, maxStackSize);
            thread.Start();
            return thread;
        }

        public static Thread LaunchNewThread(ParameterizedThreadStart threadStart, object threadStartArg, int maxStackSize)
        {
            Thread thread = new Thread(threadStart, maxStackSize);
            thread.Start(threadStartArg);
            return thread;
        }
    }
}
