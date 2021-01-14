using System;
using System.Collections.Generic;
using System.Reflection;
using System.Windows.Forms;
using Tncvd.Core.Reflection;

namespace Tncvd.WinForms.Controls
{
    public class TdUserControl : UserControl
    {
        public TdUserControl()
        {
            this.InitControl();
        }

        #region InitControl.Protected

        #region CoreMethods

        protected virtual void InitControl()
        {
            this.InitControl(true);
        }

        protected virtual void InitControl(bool suspendLayout)
        {
            Control[] controlsArr = this.StartInitControl(suspendLayout);
            this.InitControlCore(controlsArr);
            this.EndInitControl(suspendLayout);
        }

        protected virtual Control[] StartInitControl(bool suspendLayout)
        {
            Control[] controlsArr = this.InitComposite();

            if (suspendLayout)
            {
                this.ExecuteSuspendLayout();
            }

            return controlsArr;
        }

        protected virtual void InitControlCore(Control[] controlsArr)
        {
            this.InitCompositeProperties();
            this.AddComposite(controlsArr);
            this.InitControlProperties();
        }

        protected virtual void EndInitControl(bool suspendLayout)
        {
            if (suspendLayout)
            {
                this.ExecuteResumeLayout();
                this.ExecutePerformLayout();
            }
        }

        protected virtual void InitControlProperties()
        {
            this.InitControlDefaultProperties();
            this.InitControlCustomProperties();
        }

        #endregion CoreMethods

        #region SuspendResumeLayout

        protected virtual void ExecuteSuspendLayout()
        {
            this.SuspendLayout();
        }

        protected virtual void ExecuteResumeLayout()
        {
            this.ResumeLayout(false);
        }

        protected virtual void ExecutePerformLayout()
        {
            this.PerformLayout();
        }

        #endregion SuspendResumeLayout

        #region Composite

        protected virtual Control[] InitComposite()
        {
            PropertyInfo[] propertyInfoArr = this.GetAutoAssignedControlProperties();

            Control[] controlsArr = this.InitComposite(propertyInfoArr);
            return controlsArr;
        }

        protected virtual Control[] InitComposite(PropertyInfo[] propertyInfoArr)
        {
            Queue<Control> controlQueue = new Queue<Control>();

            foreach (PropertyInfo prop in propertyInfoArr)
            {
                Control control = this.AutoAssignControlProperty(prop);
                controlQueue.Enqueue(control);
            }

            Control[] controlArr = controlQueue.ToArray();
            return controlArr;
        }

        protected virtual PropertyInfo[] GetAutoAssignedControlProperties()
        {
            PropertyInfo[] propertyInfoArr = this.GetType().GetInstPropsWPubOrPrtcSttr(ConstantValues.DelegateExpressions.SimpleControlTypeSelector);
            return propertyInfoArr;
        }

        protected virtual Control AutoAssignControlProperty(PropertyInfo propertyInfo)
        {
            Control control = Activator.CreateInstance(propertyInfo.PropertyType) as Control;
            propertyInfo.SetValue(this, control);

            return control;
        }

        protected virtual void AddComposite(Control[] controlsArr)
        {
            foreach (Control control in controlsArr)
            {
                this.Controls.Add(control);
            }
        }

        protected virtual void InitCompositeProperties()
        {
        }

        #endregion Composite

        #region ControlDefaultProperties

        protected virtual void InitControlDefaultProperties()
        {
            this.AddCustomControlDefaultProperties();
        }

        #endregion ControlDefaultProperties

        #region ControlCustomProperties

        protected virtual void InitControlCustomProperties()
        {
            this.SetDockStyle();
        }

        protected virtual void SetDockStyle()
        {
            this.Dock = DockStyle.None;
        }

        #endregion ControlCustomProperties

        #endregion InitControl.Protected
    }
}
