using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.WinForms.Utility
{
    public static partial class ConstantValues
    {
        public const int APP_WINDOW_DEFAULT_SIZE_X = 1280;
        public const int APP_WINDOW_DEFAULT_SIZE_Y = 720;

        public static readonly Size AppWindowDefaultSize = new Size(
            APP_WINDOW_DEFAULT_SIZE_X,
            APP_WINDOW_DEFAULT_SIZE_Y);
    }
}
