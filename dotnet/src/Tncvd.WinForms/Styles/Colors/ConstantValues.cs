using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tncvd.WinForms.Styles.Colors
{
    public static class ConstantValues
    {
        public static class TextColors
        {
            public static readonly Color DefaultTextColor = Color.FromArgb(255, 96, 96, 96);

            public static readonly Color InformationTextColor = Color.FromArgb(255, 32, 128, 255);

            public static readonly Color SuccessColor = Color.FromArgb(255, 0, 148, 0);

            public static readonly Color WarningTextColor = Color.FromArgb(255, 255, 164, 0);

            public static readonly Color ErrorTextColor = Color.FromArgb(255, 255, 32, 96);

            public static readonly Color EmphasizeColor = Color.FromArgb(255, 0, 0, 0);
        }
    }

    public enum LogLevel
    {
        Debug = 0,
        Information = 1,
        Success = 2,
        Warning = 3,
        Error = 4
    }
}
