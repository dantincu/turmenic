using System;
using Turmenic.DataAccess.Sqlite.Test.Console.App.Components;

namespace Turmenic.DataAccess.Sqlite.Test.Console.App
{
    class Program
    {
        static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World!");

            new TestComponent().Run();
        }
    }
}
