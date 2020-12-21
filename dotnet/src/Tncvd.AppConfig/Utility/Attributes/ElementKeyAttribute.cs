using System;
using System.Collections.Generic;
using System.Text;

namespace Tncvd.AppConfig.Utility.Attributes
{
    public class ElementKeyAttribute : Attribute
    {
        public ElementKeyAttribute(string elementKey)
        {
            this.AssureElementKeyNotEmpty(elementKey);
            this.ElementKey = elementKey;
        }

        public string ElementKey { get; }

        private void AssureElementKeyNotEmpty(string elementKey)
        {
            if (string.IsNullOrWhiteSpace(elementKey))
            {
                throw new ArgumentNullException("The element key cannot be null or empty!");
            }
        }
    }
}
