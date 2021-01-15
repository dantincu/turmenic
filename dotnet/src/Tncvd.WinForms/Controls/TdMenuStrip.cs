﻿using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public class TdMenuStrip : MenuStrip
    {
        public TdMenuStrip()
        {
            this.AddDefaultProperties();
            this.InitControlProperties();
        }

        protected virtual void InitControlProperties()
        {
            this.SetDockStyle();
        }

        protected virtual void SetDockStyle()
        {
            this.Dock = DockStyle.Top;
        }
    }
}
