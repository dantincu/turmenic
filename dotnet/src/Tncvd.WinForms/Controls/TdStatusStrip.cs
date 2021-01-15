﻿using System.Windows.Forms;

namespace Tncvd.WinForms.Controls
{
    public class TdStatusStrip : StatusStrip
    {
        public TdStatusStrip()
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
            this.Dock = DockStyle.Bottom;
        }
    }
}
