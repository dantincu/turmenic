using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;

namespace SimplePasswordTool.DataSource
{
    public class ListSource<TItem> : IListSource
    {
        public ListSource(List<TItem> dataList)
        {
            this.DataList = dataList;
        }

        public virtual bool ContainsListCollection => false;

        public List<TItem> DataList { get; }

        public IList GetList()
        {
            return this.DataList;
        }
    }
}
