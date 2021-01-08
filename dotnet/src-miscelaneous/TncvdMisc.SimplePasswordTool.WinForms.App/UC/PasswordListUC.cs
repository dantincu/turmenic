using Tncvd.Core.Collection;
using SimplePasswordTool.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace SimplePasswordTool.UC
{
    public partial class PasswordListUC : UserControl
    {
        private Action<PasswordData> passwordItemChanged;
        private Action passwordItemsOrderSave;
        private Action<PasswordData> passwordItemDelete;

        public PasswordListUC()
        {
            this.InitializeComponent();
            this.InitControls();
        }

        protected List<PasswordData> DataSource { get; private set; }

        public event Action<PasswordData> PasswordItemChanged
        {
            add
            {
                this.passwordItemChanged += value;
            }

            remove
            {
                this.passwordItemChanged -= value;
            }
        }

        public event Action PasswordItemsOrderSave
        {
            add
            {
                this.passwordItemsOrderSave += value;
            }

            remove
            {
                this.passwordItemsOrderSave -= value;
            }
        }

        public event Action<PasswordData> PasswordItemDelete
        {
            add
            {
                this.passwordItemDelete += value;
            }

            remove
            {
                this.passwordItemDelete -= value;
            }
        }

        public void SetDataSource(List<PasswordData> dataList)
        {
            this.DataSource = this.AddBlankNewPasswordItemToDataSource(dataList);
            
            this.RefreshList();
            this.ClearListBoxSelection();
        }

        public void RefreshList()
        {
            this.listBoxPasswords.DataSource = null;
            this.listBoxPasswords.DataSource = this.DataSource;
            this.listBoxPasswords.ValueMember = "Id";
            this.listBoxPasswords.DisplayMember = "PasswordName";
            this.listBoxPasswords.Refresh();
        }

        public void EnableSaveOrder(bool enable = true)
        {
            this.btnSaveOrder.Enabled = enable;
        }

        public void ClearListBoxSelection()
        {
            this.listBoxPasswords.ClearSelected();
        }

        private void EnableAddDeleteItemButtons(bool enable)
        {
            this.btnDeletePassword.Enabled = enable;
            this.btnAddNewPassword.Enabled = enable;
        }

        private void EnableSortButtons(bool enable)
        {
            this.btnMoveListItemDown.Enabled = enable;
            this.btnMoveListItemUp.Enabled = enable;
            this.btnMoveListItemToBottom.Enabled = enable;
            this.btnMoveListItemToTop.Enabled = enable;

            if (this.listBoxPasswords.SelectedIndex >= this.DataSource.Count - 2)
            {
                this.btnMoveListItemToBottom.Enabled = false;
                this.btnMoveListItemDown.Enabled = false;
            }

            if (this.listBoxPasswords.SelectedIndex == 0)
            {
                this.btnMoveListItemToTop.Enabled = false;
                this.btnMoveListItemUp.Enabled = false;
            }
        }

        private void EnableAddDeleteItemButtons(int selectedIndex)
        {
            bool enableActionButtons = selectedIndex >= 0 ? this.DataSource[selectedIndex].IsBlank == false : false;

            this.EnableAddDeleteItemButtons(enableActionButtons);
            this.EnableSortButtons(enableActionButtons);
        }

        private void InitControls()
        {
            this.EnableSaveOrder(false);
        }

        private List<PasswordData> AddBlankNewPasswordItemToDataSource(List<PasswordData> dataList)
        {
            if (dataList.Any(item => item.IsBlank) == false)
            {
                dataList.Add(new PasswordData
                {
                    PasswordName = "<ADD NEW>"
                });
            }

            return dataList;
        }

        private void MoveSelectedItemToIndex(int newIndex)
        {
            this.DataSource.MoveItem(this.listBoxPasswords.SelectedIndex, newIndex);
            this.listBoxPasswords.SelectedIndex = newIndex;
            this.RefreshList();
            this.EnableSortButtons(true);
        }

        #region UserControl Events

        private void ListBoxPasswords_SelectedIndexChanged(object sender, EventArgs e)
        {
            this.EnableAddDeleteItemButtons(this.listBoxPasswords.SelectedIndex);
            this.passwordItemChanged.Invoke(this.listBoxPasswords.SelectedIndex >= 0 ? this.DataSource[this.listBoxPasswords.SelectedIndex] : null);
        }

        private void BtnSaveOrder_Click(object sender, EventArgs e)
        {
            this.EnableSaveOrder(false);
            this.passwordItemsOrderSave();
        }

        private void btnAddNewPassword_Click(object sender, EventArgs e)
        {
            this.listBoxPasswords.SelectedIndex = this.DataSource.WithIndex().Single(item => item.Value.IsBlank).Key;
        }

        private void btnDeletePassword_Click(object sender, EventArgs e)
        {
            this.passwordItemDelete(this.DataSource[this.listBoxPasswords.SelectedIndex]);
        }

        private void btnMoveListItemToBottom_Click(object sender, EventArgs e)
        {
            this.EnableSaveOrder();
            this.MoveSelectedItemToIndex(this.DataSource.Count - 2);
        }

        private void btnMoveListItemDown_Click(object sender, EventArgs e)
        {
            this.EnableSaveOrder();
            this.MoveSelectedItemToIndex(this.listBoxPasswords.SelectedIndex + 1);
        }

        private void btnMoveListItemToTop_Click(object sender, EventArgs e)
        {
            this.EnableSaveOrder();
            this.MoveSelectedItemToIndex(0);
            this.RefreshList();
        }

        private void btnMoveListItemUp_Click(object sender, EventArgs e)
        {
            this.EnableSaveOrder();
            this.MoveSelectedItemToIndex(this.listBoxPasswords.SelectedIndex - 1);
            this.RefreshList();
        }

        #endregion UserControl Events
    }
}
