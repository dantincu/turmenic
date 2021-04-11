using System.Windows.Forms;

namespace Turmerik.WinForms.Forms
{
    public partial class TdFormBase : Form
    {
        public TdFormBase()
        {
            // this.InitializeComponent();
            this.InitForm();
        }

        protected virtual void InitForm()
        {
            this.SetFormClientSize();
        }

        protected virtual void SetFormClientSize()
        {
            this.ClientSize = WinForms.Controls.ConstantValues.Forms.DefaultFormSize;
        }

        protected virtual TFormUC AddFormUC<TFormUC>() where TFormUC : TdFormUCBase, new()
        {
            TFormUC formUC = new TFormUC();
            this.Controls.Add(formUC);

            return formUC;
        }
    }
}
