namespace Turmenic.Core.AppConfig
{
    public class LibConfigContainer : LibConfigContainerBase<LibConfig, LibConfigSrlz>
    {
        private static LibConfigContainer instance;

        private LibConfigContainer()
        {
        }

        public static LibConfigContainer Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new LibConfigContainer();
                }

                return instance;
            }
        }
    }
}
