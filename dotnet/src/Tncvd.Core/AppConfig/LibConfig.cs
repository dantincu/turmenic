using Tncvd.Core.DataTypes;

namespace Tncvd.Core.AppConfig
{
    public class LibConfigSrlz
    {
        public SpecialDirsSrlz SpecialDirs { get; set; }
    }

    public class SpecialDirsSrlz
    {
        public SpecialDirNamesSrlz Names { get; set; }
        public SpecialDirDelimitersSrlz Delimiters { get; set; }
    }

    public class SpecialDirNamesSrlz
    {
        public AltStringSrlz People { get; set; }
        public AltStringSrlz Shared { get; set; }
        public AltStringSrlz Archive { get; set; }
        public AltStringSrlz Content { get; set; }
        public AltStringSrlz Files { get; set; }
        public AltStringSrlz Images { get; set; }
        public AltStringSrlz ImagesDocs { get; set; }
        public AltStringSrlz WebFiles { get; set; }
        public AltStringSrlz EDocs { get; set; }
        public AltStringSrlz PhotoDocs { get; set; }
        public AltStringSrlz PhotoImages { get; set; }
        public AltStringSrlz InfoPhotoDocs { get; set; }
        public AltStringSrlz InfoPhotoImages { get; set; }
        public AltStringSrlz DocumentScanDocs { get; set; }
        public AltStringSrlz DocumentScanImages { get; set; }
        public AltStringSrlz DocumentPhotoDocs { get; set; }
        public AltStringSrlz DocumentPhotoImages { get; set; }
        public AltStringSrlz DocumentProcessedPhotoDocs { get; set; }
        public AltStringSrlz DocumentProcessedPhotoImages { get; set; }
    }

    public class SpecialDirDelimitersSrlz
    {
        public AltStringSrlz L1DirNameStartDelimiter { get; set; }
        public AltStringSrlz L1DirNameEndDelimiter { get; set; }
        public AltStringSrlz DirNameSegmentsDelimiter { get; set; }
        public AltStringSrlz L2DirNameStartDelimiter { get; set; }
        public AltStringSrlz L2DirNameEndDelimiter { get; set; }
    }

    public class LibConfig : ReadonlyData<LibConfigSrlz>
    {
        public LibConfig(LibConfigSrlz data) : base(data)
        {
            this.SpecialDirs = new SpecialDirs(data.SpecialDirs);
        }

        public SpecialDirs SpecialDirs { get; }
    }

    public class SpecialDirs : ReadonlyData<SpecialDirsSrlz>
    {
        public SpecialDirs(SpecialDirsSrlz data) : base(data)
        {
            this.Names = new SpecialDirNames(data.Names);
            this.Delimiters = new SpecialDirDelimiters(data.Delimiters);
        }

        public SpecialDirNames Names { get; }
        public SpecialDirDelimiters Delimiters { get; }
    }

    public class SpecialDirNames : ReadonlyData<SpecialDirNamesSrlz>
    {
        public SpecialDirNames(SpecialDirNamesSrlz data) : base(data)
        {
            this.People = new AltString(data.People);
            this.Shared = new AltString(data.Shared);
            this.Archive = new AltString(data.Archive);
            this.Content = new AltString(data.Content);
            this.Files = new AltString(data.Files);
            this.Images = new AltString(data.Images);
            this.ImagesDocs = new AltString(data.ImagesDocs);
            this.WebFiles = new AltString(data.WebFiles);
            this.EDocs = new AltString(data.EDocs);
            this.PhotoDocs = new AltString(data.PhotoDocs);
            this.PhotoImages = new AltString(data.PhotoImages);
            this.InfoPhotoDocs = new AltString(data.InfoPhotoDocs);
            this.InfoPhotoImages = new AltString(data.InfoPhotoImages);
            this.DocumentScanDocs = new AltString(data.DocumentScanDocs);
            this.DocumentScanImages = new AltString(data.DocumentScanImages);
            this.DocumentPhotoDocs = new AltString(data.DocumentPhotoDocs);
            this.DocumentPhotoImages = new AltString(data.DocumentPhotoImages);
            this.DocumentProcessedPhotoDocs = new AltString(data.DocumentProcessedPhotoDocs);
            this.DocumentProcessedPhotoImages = new AltString(data.DocumentProcessedPhotoImages);
        }

        public AltString People { get; }
        public AltString Shared { get; }
        public AltString Archive { get; }
        public AltString Content { get; }
        public AltString Files { get; }
        public AltString Images { get; }
        public AltString ImagesDocs { get; }
        public AltString WebFiles { get; }
        public AltString EDocs { get; }
        public AltString PhotoDocs { get; }
        public AltString PhotoImages { get; }
        public AltString InfoPhotoDocs { get; }
        public AltString InfoPhotoImages { get; }
        public AltString DocumentScanDocs { get; }
        public AltString DocumentScanImages { get; }
        public AltString DocumentPhotoDocs { get; }
        public AltString DocumentPhotoImages { get; }
        public AltString DocumentProcessedPhotoDocs { get; }
        public AltString DocumentProcessedPhotoImages { get; }
    }

    public class SpecialDirDelimiters : ReadonlyData<SpecialDirDelimitersSrlz>
    {
        public SpecialDirDelimiters(SpecialDirDelimitersSrlz data) : base(data)
        {
            this.L1DirNameStartDelimiter = new AltString(data.L1DirNameStartDelimiter);
            this.L1DirNameEndDelimiter = new AltString(data.L1DirNameEndDelimiter);
            this.DirNameSegmentsDelimiter = new AltString(data.DirNameSegmentsDelimiter);
            this.L2DirNameStartDelimiter = new AltString(data.L2DirNameStartDelimiter);
            this.L2DirNameEndDelimiter = new AltString(data.L2DirNameEndDelimiter);
        }

        public AltString L1DirNameStartDelimiter { get; }
        public AltString L1DirNameEndDelimiter { get; }
        public AltString DirNameSegmentsDelimiter { get; }
        public AltString L2DirNameStartDelimiter { get; }
        public AltString L2DirNameEndDelimiter { get; }
    }
}
