﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Turmenic.DataAccess.EntityFrameworkCore.Config;
using Turmenic.DataAccess.EntityFrameworkCore.EntityConfigurators;
using Turmenic.DataAccess.Sqlite.Test.Xunit.DataModels;

namespace Turmenic.DataAccess.Sqlite.Test.Xunit.Config
{
    public class AdministrativeRegionCfg
        : DbAutoGeneratedPkNamedEntityI18nCfg<AdministrativeRegion, int, AdministrativeRegionName, int, AdministrativeRegionCfgOpts>
    {
        public AdministrativeRegionCfg(
            EntityTypeBuilder<AdministrativeRegion> entityTypeBuilder,
            AdministrativeRegionCfgOpts entityCfgOptions) : base(entityTypeBuilder, entityCfgOptions)
        {
        }

        protected override void Configure(EntityTypeBuilder<AdministrativeRegion> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.Code).IsRequired(false).HasMaxLength(AddressCfg.DEFAULT_GENERIC_CODE_MAX_LENGTH);

            entityTypeBuilder.HasOne(e => e.AdministrativeRegionType).WithMany().HasForeignKey(e => e.AdministrativeRegionTypeId).IsRequired();
            entityTypeBuilder.HasOne(e => e.Country).WithMany().HasForeignKey(e => e.CountryId).IsRequired();
        }
    }

    public class AdministrativeRegionCfgOpts : NamedEntityI18nCfgOpts<AdministrativeRegion, int, AdministrativeRegionName, int>
    {
    }

    public class AdministrativeRegionNameCfg
        : DefaultPkEntityNameI18nCfg<AdministrativeRegion, int, AdministrativeRegionName, int, AdministrativeRegionNameCfgOpts>
    {
        public AdministrativeRegionNameCfg(
            EntityTypeBuilder<AdministrativeRegionName> entityTypeBuilder,
            AdministrativeRegionNameCfgOpts entityCfgOptions)
            : base(entityTypeBuilder, entityCfgOptions)
        {
        }
    }

    public class AdministrativeRegionNameCfgOpts : EntityNameI18nCfgOpts<AdministrativeRegion, int, AdministrativeRegionName, int>
    {
    }
}
