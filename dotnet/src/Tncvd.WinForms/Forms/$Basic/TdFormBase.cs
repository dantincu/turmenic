using System;
using System.Collections.Generic;
using System.Reflection;
using System.Windows.Forms;
using Tncvd.Core.Reflection;
using Tncvd.WinForms.Controls;

namespace Tncvd.WinForms.Forms
{
    public partial class TdFormBase : Form
    {
        public TdFormBase()
        {
            // this.InitializeComponent();
            this.InitForm();
        }

        #region InitForm.Protected

        #region CoreMethods

        protected virtual void InitForm()
        {
            this.InitForm(true);
        }

        protected virtual void InitForm(bool suspendLayout)
        {
            Control[] controlsArr = this.StartInitForm(suspendLayout);
            this.InitFormCore(controlsArr);
            this.EndInitForm(suspendLayout);
        }

        protected virtual Control[] StartInitForm(bool suspendLayout)
        {
            Control[] controlsArr = this.InitFormControls();

            if (suspendLayout)
            {
                this.ExecuteSuspendLayout();
            }

            return controlsArr;
        }

        protected virtual void InitFormCore(Control[] controlsArr)
        {
            this.InitFormControlProperties(controlsArr);
            this.AddFormControls(controlsArr);
            this.InitFormProperties();
        }

        protected virtual void EndInitForm(bool suspendedLayout)
        {
            if (suspendedLayout)
            {
                this.ExecuteResumeLayout();
                this.ExecutePerformLayout();
            }
        }

        protected virtual void InitFormProperties()
        {
            this.InitFormDefaultProperties();
            this.InitFormCustomProperties();
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
        }

        #endregion SuspendResumeLayout

        #region FormControls

        protected virtual Control[] InitFormControls()
        {
            PropertyInfo[] propertyInfoArr = this.GetAutoAssignedControlProperties();

            Control[] controlsArr = this.InitFormControls(propertyInfoArr);
            return controlsArr;
        }

        protected virtual PropertyInfo[] GetAutoAssignedControlProperties()
        {
            PropertyInfo[] propertyInfoArr = this.GetType().GetInstPropsWPubOrPrtcSttr(prop => typeof(Control).IsAssignableFrom(prop.PropertyType));
            return propertyInfoArr;
        }

        protected virtual Control AutoAssignControlProperty(PropertyInfo propertyInfo)
        {
            Control control = Activator.CreateInstance(propertyInfo.PropertyType) as Control;
            propertyInfo.SetValue(this, control);

            return control;
        }

        protected virtual Control[] InitFormControls(PropertyInfo[] propertyInfoArr)
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

        protected virtual void AddFormControls(Control[] controlsArr)
        {
            foreach (Control control in controlsArr)
            {
                this.Controls.Add(control);
            }
        }

        protected virtual void InitFormControlProperties(Control[] controlsArr)
        {
        }

        #endregion FormControls

        #region FormDefaultProperties

        protected virtual void InitFormDefaultProperties()
        {
            this.AddCustomControlDefaultProperties();
        }

        #endregion FormDefaultProperties

        #region FormCustomProperties

        protected virtual void InitFormCustomProperties()
        {
            this.SetClientSize();
        }

        protected virtual void SetClientSize()
        {
            this.ClientSize = WinForms.Controls.ConstantValues.Forms.DefaultFormSize;
        }

        #endregion FormustomProperties

        #endregion InitForm.Protected
    }
}
