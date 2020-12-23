namespace Tncvd.Console.App
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // AppExecutionInfo.Register();

            System.Console.WriteLine("Hello World!");

            new AppExecutionWrapper().Run();
        }
    }
}
