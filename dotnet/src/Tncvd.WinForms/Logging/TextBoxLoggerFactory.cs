using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Tncvd.WinForms.Logging
{
    public class TextBoxLoggerFactory
    {
        #region Fields

        private static TextBoxLoggerFactory _instance;

        private RichTextBox _defaultLoggingRichTextBox;
        private RichTextBox _defaultOutputRichTextBox;

        #endregion Fields

        #region Constructors

        private TextBoxLoggerFactory()
        {
        }

        #endregion Constructors

        #region Properties

        public static TextBoxLoggerFactory Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new TextBoxLoggerFactory();
                }

                return _instance;
            }
        }

        #endregion Properties

        #region Methods

        public TextBoxLogger GetTextBoxLogger(TextBoxBase textBox, string loggerName)
        {
            return new TextBoxLogger(textBox, loggerName);
        }

        public RichTextBoxLogger GetRichTextBoxLogger(RichTextBox richTextBox, string loggerName)
        {
            return new RichTextBoxLogger(richTextBox, loggerName);
        }

        public AppTextBoxLogger GetAppTextBoxLogger(RichTextBox richTextBox, string loggerName)
        {
            return new AppTextBoxLogger(richTextBox, loggerName);
        }

        public void RegisterDefaultLoggingRichTextBox(RichTextBox richTextBox)
        {
            this.AssureDefaultLoggingRichTextBoxNotYetRegistered();
            this.ValidateRichTextBoxRegisterArgument(richTextBox);
            this._defaultLoggingRichTextBox = richTextBox;
        }

        public void RegisterDefaultOutputRichTextBox(RichTextBox richTextBox)
        {
            this.AssureDefaultOutputRichTextBoxNotYetRegistered();
            this.ValidateRichTextBoxRegisterArgument(richTextBox);
            this._defaultOutputRichTextBox = richTextBox;
        }

        public AppTextBoxLogger GetAppTextBoxLogger(string loggerName)
        {
            this.AssureDefaultLoggingRichTextBoxRegistered();
            return this.GetAppTextBoxLogger(this._defaultLoggingRichTextBox, loggerName);
        }

        public AppTextBoxLogger GetOutputTextBoxLogger(string loggerName)
        {
            this.AssureDefaultOutputRichTextBoxRegistered();
            return this.GetAppTextBoxLogger(this._defaultOutputRichTextBox, loggerName);
        }

        #region Methods - Validaion

        private void ValidateRichTextBoxRegisterArgument(RichTextBox richTextBox)
        {
            if (richTextBox == null)
            {
                throw new ArgumentNullException("The provided rich text box argument must not be null!");
            }
        }

        private void AssureDefaultLoggingRichTextBoxRegistered()
        {
            if (this._defaultLoggingRichTextBox == null)
            {
                throw new InvalidOperationException("The default logging rich text box has not yet been registered!");
            }
        }

        private void AssureDefaultLoggingRichTextBoxNotYetRegistered()
        {
            if (this._defaultLoggingRichTextBox != null)
            {
                throw new InvalidOperationException("The default logging rich text box has already been registered and it cannot be registered twice!");
            }
        }

        private void AssureDefaultOutputRichTextBoxRegistered()
        {
            if (this._defaultOutputRichTextBox == null)
            {
                throw new InvalidOperationException("The default output rich text box has not yet been registered!");
            }
        }

        private void AssureDefaultOutputRichTextBoxNotYetRegistered()
        {
            if (this._defaultOutputRichTextBox != null)
            {
                throw new InvalidOperationException("The default output rich text box has already been registered and it cannot be registered twice!");
            }
        }

        #endregion Methods - Validaion

        #endregion Methods
    }
}
