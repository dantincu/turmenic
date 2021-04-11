using System.Drawing;
using System.Windows.Forms;
using Turmerik.Core.Reflection;
using Turmerik.WinForms.Components;
using Turmerik.WinForms.Controls;

namespace Turmerik.WinForms.Forms
{
    public partial class TdLargeWindowUCBase : TdWindowUCBase
    {
        public TdLargeWindowUCBase()
        {
            // InitializeComponent();
        }

        #region Components

        protected SplitContainerToggleToolStripItem<ToolStripButton, TdSplitContainer> SidePanelToggle { get; set; }

        #endregion Components

        #region Controls
        [AutoInit]
        protected TdMenuStrip MenuStrip { get; set; }

        [AutoInit]
        protected TdStatusStrip StatusStrip { get; set; }

        [AutoInit]
        protected TdToolStrip SidePanelToolStrip { get; set; }
        protected ToolStripButton SidePanelToggleButton { get; set; }

        [AutoInit]
        protected TdSplitContainer SplitContainer { get; set; }

        #endregion Controls

        #region InitComponents

        protected override void InitComponents()
        {
            this.InitSidePanelToggle();
        }

        protected virtual void InitSidePanelToggle()
        {
            this.SidePanelToggle = new SplitContainerToggleToolStripItem<ToolStripButton, TdSplitContainer>(
                this.SidePanelToggleButton,
                this.SplitContainer,
                null,
                true);
        }

        #endregion InitComponents

        #region InitControl.Protected

        #region Composite

        protected override Control[] InitComposite()
        {
            Control[] controlsArr = base.InitComposite();
            this.SidePanelToggleButton = new ToolStripButton();

            return controlsArr;
        }

        protected override void InitCompositeProperties()
        {
            base.InitCompositeProperties();

            this.InitToolStripProperties(this.SidePanelToolStrip);
            this.InitSidePanelToggleButtonProps(this.SidePanelToggleButton);
        }

        protected override void AddComposite(Control[] controlsArr)
        {
            this.SidePanelToolStrip.Items.Add(this.SidePanelToggleButton);

            base.AddComposite(controlsArr);
        }

        #region ToolStrip

        protected virtual void InitToolStripProperties(TdToolStrip toolStrip)
        {
            this.SetToolStripDockStyle(toolStrip);
            
        }

        protected virtual void SetToolStripDockStyle(TdToolStrip toolStrip)
        {
            toolStrip.Dock = DockStyle.Left;
        }

        #endregion ToolStrip

        #region SidePanelToggleButton

        protected virtual void InitSidePanelToggleButtonProps(ToolStripButton sidePanelToggleButton)
        {
            this.SetSidePanelToggleButtonFont(sidePanelToggleButton);
        }

        protected virtual void SetSidePanelToggleButtonFont(ToolStripButton sidePanelToggleButton)
        {
            sidePanelToggleButton.UpdateFont(FontStyle.Bold, 12);
        }

        #endregion SidePanelToggleButton

        #endregion Composite

        #endregion InitControl.Protected
    }
}
