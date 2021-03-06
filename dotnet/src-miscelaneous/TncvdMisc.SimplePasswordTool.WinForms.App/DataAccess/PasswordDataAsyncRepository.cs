﻿using Turmenic.DataAccess.VelocityDb.Repository;
using Turmenic.DataAccess.VelocityDb.UnitOfWork;
using SimplePasswordTool.DataModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimplePasswordTool.DataAccess
{
    public class PasswordDataAsyncRepository : AsyncRepositoryBase<PasswordDataModel>
    {
        public PasswordDataAsyncRepository(DbSession dbSession, uint databaseNumber) : base(dbSession, databaseNumber)
        {
        }

        public Task UpdateIndexesAsync(Dictionary<ulong, int> indexesDict)
        {
            return this.UpdatePropsForIdArrAsync(indexesDict, (item, value) => item.SortIndex = value);
        }

        protected override Comparison<PasswordDataModel> GetDefaultSortDelegate()
        {
            return (leftItem, rightItem) => leftItem.SortIndex.CompareTo(rightItem.SortIndex);
        }
    }
}
