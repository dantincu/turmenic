using System.Drawing;

namespace Tncvd.WinForms.Controls
{
    public static partial class ConstantValues
    {
        public static class Forms
        {
            public static readonly Size DefaultFormSize = new Size(800, 450);
            public static readonly Size DefaultWindowSize = new Size(900, 900);
            public static readonly Size DefaultLargeWindowSize = new Size(1800, 900);
        }

        public static class LargeWindowControls
        {
            public static class SplitContainerUC
            {
                public const int SPLITTER_DISTANCE_PX = 50;
            }
        }
    }
}
