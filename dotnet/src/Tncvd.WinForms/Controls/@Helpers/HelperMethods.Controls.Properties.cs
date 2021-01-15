using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public static partial class HelperMethods
    {
        #region Extensions

        public static void AddDefaultProperties(this Control ctrl)
        {
            AddDefaultControlProperties(ctrl);
        }

        public static void AddDefaultProperties(ButtonBase ctrl)
        {
            ((Control)ctrl).AddDefaultProperties();
            AddDefaultControlProperties(ctrl);
        }

        public static void AddDefaultProperties(this TextBoxBase ctrl)
        {
            ((Control)ctrl).AddDefaultProperties();
            AddDefaultControlProperties(ctrl);
        }

        public static void AddDefaultProperties(this ScrollableControl ctrl)
        {
            ((Control)ctrl).AddDefaultProperties();
            AddDefaultControlProperties(ctrl);
        }

        public static void AddDefaultProperties(this ContainerControl ctrl)
        {
            ((ScrollableControl)ctrl).AddDefaultProperties();
            AddDefaultControlProperties(ctrl);
        }

        public static void AddDefaultProperties(this Panel ctrl)
        {
            ((ScrollableControl)ctrl).AddDefaultProperties();
            AddDefaultControlProperties(ctrl);
        }

        public static void AddCustomControlDefaultProperties(this ContainerControl ctrl)
        {
            ctrl.AddDefaultProperties();

            ctrl.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            ctrl.AutoScaleMode = AutoScaleMode.Font;
        }

        #endregion Extensions

        public static void AddDefaultControlProperties(Control ctrl)
        {
        }

        public static void AddDefaultControlProperties(ButtonBase ctrl)
        {
        }

        public static void AddDefaultControlProperties(TextBoxBase ctrl)
        {
        }

        public static void AddDefaultControlProperties(ScrollableControl ctrl)
        {
            ctrl.Dock = DockStyle.Fill;
        }

        public static void AddDefaultControlProperties(ContainerControl ctrl)
        {
        }

        public static void AddDefaultControlProperties(Panel ctrl)
        {
        }
    }
}
