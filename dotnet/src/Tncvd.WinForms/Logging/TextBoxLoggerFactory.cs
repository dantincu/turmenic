using System;
using System.Collections.Concurrent;
using System.Windows.Forms;
using Tncvd.WinForms.AppExecution;
using Tncvd.WinForms.Controls;
using Tncvd.Collections;

namespace Tncvd.WinForms.Logging
{
    public class TextBoxLoggerFactory
    {
        #region Fields

        private static TextBoxLoggerFactory _instance;

        private readonly object syncLock = new object();

        private readonly ConcurrentQueue<AppTextBoxLogger> _appTextBoxLoggerQueue = new ConcurrentQueue<AppTextBoxLogger>();
        private readonly ConcurrentQueue<AppTextBoxLogger> _outputTextBoxLoggerQueue = new ConcurrentQueue<AppTextBoxLogger>();

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

        public AppTextBoxLogger GetAppTextBoxLogger(string loggerName)
        {
            AppTextBoxLogger appTextBoxLogger = new AppTextBoxLogger(this._defaultLoggingRichTextBox, loggerName);
            this.AddAppTextBoxLoggerToQueue(appTextBoxLogger);

            return appTextBoxLogger;
        }

        public AppTextBoxLogger GetOutputTextBoxLogger(string loggerName)
        {
            AppTextBoxLogger outputTextBoxLogger = new AppTextBoxLogger(this._defaultOutputRichTextBox, loggerName);
            this.AddOutputTextBoxLoggerToQueue(outputTextBoxLogger);

            return outputTextBoxLogger;
        }

        public void RegisterDefaultLoggingAppTextBox(AppRichTextBox appTextBox)
        {
            this._defaultLoggingRichTextBox = this.AssureLoggingTextBoxNotNull(appTextBox ?? throw new ArgumentNullException(nameof(appTextBox)));

            this.ConsumeLoggerQueue(this._appTextBoxLoggerQueue, appTextBox);
        }

        public void RegisterDefaultOutputAppTextBox(AppRichTextBox appTextBox)
        {
            this._defaultOutputRichTextBox = this.AssureOutputTextBoxNotNull(appTextBox ?? throw new ArgumentNullException(nameof(appTextBox)));

            this.ConsumeLoggerQueue(this._outputTextBoxLoggerQueue, appTextBox);
        }

        private void ConsumeLoggerQueue(ConcurrentQueue<AppTextBoxLogger> concurrentQueue, AppRichTextBox appTextBox)
        {
            concurrentQueue.CloneAndConsume(logger =>
            {
                logger.AssignTextBox(appTextBox);
            });
        }

        private void AddAppTextBoxLoggerToQueue(AppTextBoxLogger textBoxLogger)
        {
            this._appTextBoxLoggerQueue.Enqueue(textBoxLogger);
        }

        private void AddOutputTextBoxLoggerToQueue(AppTextBoxLogger textBoxLogger)
        {
            this._outputTextBoxLoggerQueue.Enqueue(textBoxLogger);
        }

        private AppRichTextBox AssureLoggingTextBoxNotNull(AppRichTextBox appTextBox)
        {
            if (this.IsLoggingTextBoxNull() == false)
            {
                throw new InvalidOperationException("The default logging text box cannot be assigned twice!");
            }

            return appTextBox;
        }

        private AppRichTextBox AssureOutputTextBoxNotNull(AppRichTextBox appTextBox)
        {
            if (this.IsOutputTextBoxNull() == false)
            {
                throw new InvalidOperationException("The default output text box cannot be assigned twice!");
            }

            return appTextBox;
        }

        private bool IsLoggingTextBoxNull()
        {
            bool retVal = false;

            if (this._defaultLoggingRichTextBox == null)
            {
                lock (this.syncLock)
                {
                    if (this._defaultLoggingRichTextBox == null)
                    {
                        retVal = true;
                    }
                }
            }

            return retVal;
        }

        private bool IsOutputTextBoxNull()
        {
            bool retVal = false;

            if (this._defaultOutputRichTextBox == null)
            {
                lock (this.syncLock)
                {
                    if (this._defaultOutputRichTextBox == null)
                    {
                        retVal = true;
                    }
                }
            }

            return retVal;
        }

        #endregion Methods
    }
}
