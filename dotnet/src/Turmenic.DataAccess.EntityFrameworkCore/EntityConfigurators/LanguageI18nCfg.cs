﻿using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Turmenic.DataAccess.EntityFrameworkCore.Config;
using Turmenic.DataAccess.EntityFrameworkCore.Entities;

namespace Turmenic.DataAccess.EntityFrameworkCore.EntityConfigurators
{
    public class LanguageI18nCfg : DbAutoGeneratedPkNamedEnumEntityI18nCfg<LanguageI18n, short, LanguageI18nName, int, LanguageI18nCfgOpts>
    {
        public LanguageI18nCfg(EntityTypeBuilder<LanguageI18n> entityTypeBuilder, LanguageI18nCfgOpts languageI18nCfgOpts)
            : base(entityTypeBuilder, languageI18nCfgOpts)
        {
        }

        protected override void Configure(EntityTypeBuilder<LanguageI18n> entityTypeBuilder)
        {
            base.Configure(entityTypeBuilder);

            entityTypeBuilder.Property(e => e.LanguageNameI18n).IsRequired().SetMaxLengthIfSpec(this.EntityCfgOptions.LanguageNameI18nMaxLength);
            entityTypeBuilder.Property(e => e.LanguageCodeI18n).IsRequired().SetMaxLengthIfSpec(this.EntityCfgOptions.LanguageCodeI18nMaxLength);
            entityTypeBuilder.Property(e => e.IsDefaultLanguageI18n).IsRequired();
        }
    }
}
