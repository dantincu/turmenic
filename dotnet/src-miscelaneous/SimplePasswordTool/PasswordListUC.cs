using SimplePasswordTool.Services;
using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace SimplePasswordTool
{
    public partial class PasswordListUC : UserControl
    {
        private Action<PasswordData> _onPasswordItemChanged;

        public PasswordListUC()
        {
            this.InitializeComponent();
        }

        protected List<PasswordData> DataSource { get; private set; }

        public event Action<PasswordData> OnPasswordItemChanged
        {
            add
            {
                this._onPasswordItemChanged += value;
            }

            remove
            {
                this._onPasswordItemChanged -= value;
            }
        }

        public void SetDataSource(List<PasswordData> dataList)
        {
            this.DataSource = dataList;
            this.listBoxPasswords.DataSource = dataList;

            this.listBoxPasswords.ValueMember = "Id";
            this.listBoxPasswords.DisplayMember = "PasswordName";
        }

        public void RefreshList()
        {
            this.listBoxPasswords.Refresh();
        }

        private void listBoxPasswords_SelectedIndexChanged(object sender, EventArgs e)
        {
            this._onPasswordItemChanged.Invoke(this.DataSource[this.listBoxPasswords.SelectedIndex]);
        }
    }
}
