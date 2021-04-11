using System;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Turmerik.Core.Collection
{
    public static partial class HelperMethods
    {
        public static Queue<T> DequeueConcurrent<T>(this ConcurrentQueue<T> concurrentQueue)
        {
            Queue<T> clone = new Queue<T>();
            T item;

            while (concurrentQueue.TryDequeue(out item))
            {
                clone.Enqueue(item);
            }

            return clone;
        }

        public static void Consume<T>(this Queue<T> queue, Action<T> consumerCallback)
        {
            T item;

            while (queue.TryDequeue(out item))
            {
                consumerCallback.Invoke(item);
            }
        }

        public static void Consume<T>(this ConcurrentQueue<T> queue, Action<T> consumerCallback)
        {
            T item;

            while (queue.TryDequeue(out item))
            {
                consumerCallback.Invoke(item);
            }
        }

        public static void CloneAndConsume<T>(this ConcurrentQueue<T> concurrentQueue, Action<T> consumerCallback)
        {
            concurrentQueue.DequeueConcurrent().Consume(consumerCallback);
        }
    }
}
