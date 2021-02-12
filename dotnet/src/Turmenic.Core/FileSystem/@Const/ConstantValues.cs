namespace Turmenic.Core.FileSystem
{
    public static partial class ConstantValues
    {
        public const char FILE_NAME_EXTENSION_DELIMITER = '.';
        public const string REL_PATH_CURRENT_DIR_SYMBOL = ".";
        public const string REL_PATH_PARENT_DIR_SYMBOL = "..";

        public const char PATH_DELIMITER_UNIX = '/';
        public const char PATH_DELIMITER_WINDOWS = '\\';

        public const char PATH_DRIVE_DELIMITER_CHAR_WINDOWS = ':';

        public const string ROOT_PATH_START_WITH_FORMAT_UNIX = "/{0}";
        public const string ROOT_PATH_START_WITH_FORMAT_WINDOWS = "{0}:";

        public const int WINDOWS_32BIT_MAX_FILE_PATH_LENGTH = 260;

        public static class CommonFileExtensions
        {
            public const string TXT = "txt";
            public const string XML = "xml";
            public const string CONFIG = "config";
            public const string JAR = "jar";
            public const string PY = "py";
            public const string ZIP = "zip";
            public const string RAR = "rar";
        }

        public static class CommonWindowsFileExtensions
        {
            public const string EXE = "exe";
            public const string BAT = "bat";
            public const string DLL = "dll";
            public const string MSI = "msi";
            public const string MANIFEST = "manifest";
        }

        public static class CommonDocsFileExtensions
        {
            public const string PDF = "pdf";
            public const string DOC = "doc";
            public const string DOCX = "docx";
            public const string XLS = "xls";
            public const string XLSX = "xlsx";
            public const string PPT = "ppt";
            public const string PPTX = "pptx";
            public const string MD = "md";
            public const string MDX = "mdx";
        }

        public static class CommonAudioFileExtensions
        {
            public const string MP3 = "mp3";
            public const string WAV = "wav";
            public const string FLAC = "flac";
        }

        public static class CommonVideoFileExtensions
        {
            public const string AVI = "avi";
            public const string MPG = "mpg";
            public const string OGG = "ogg";
            public const string M4A = "m4a";
        }

        public static class CommonWebFileExtensions
        {
            public const string HTM = "htm";
            public const string HTML = "html";
            public const string CSS = "css";
            public const string SCSS = "scss";
            public const string LESS = "less";
            public const string JSON = "json";
            public const string JS = "js";
            public const string TS = "ts";
            public const string JSX = "jsx";
            public const string TSX = "tsx";
        }

        public static class CommonDotNetFileExtensions
        {
            public const string SLN = "sln";
            public const string CSPROJ = "csproj";
            public const string CS = "cs";
            public const string CSHTML = "cshtml";
        }

        public static class CommonImageFileExtensions
        {
            public const string JPG = "jpg";
            public const string BMP = "bmp";
            public const string PNG = "png";
            public const string ICO = "ico";
            public const string GIF = "gif";
        }
    }
}
