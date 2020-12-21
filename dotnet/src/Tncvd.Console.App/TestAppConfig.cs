﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tncvd.AppConfig.Config.Env;
using Tncvd.AppConfig.Env;

namespace Tncvd.Console.App
{
    internal class TestAppConfig
    {
        public void Run()
        {
            System.Console.WriteLine($"Root env path: {AppEnvConfigContainer.Instance.EnvRootPath}");
            System.Console.WriteLine($"Root env config path: {AppEnvConfigContainer.Instance.GetEnvConfigPath()}");
            System.Console.WriteLine($"Root env content path: {AppEnvConfigContainer.Instance.GetEnvContentPath()}");
            System.Console.WriteLine($"Root env data path: {AppEnvConfigContainer.Instance.GetEnvDataPath()}");
            System.Console.WriteLine($"Root env logs path: {AppEnvConfigContainer.Instance.GetEnvLogsPath()}");
            System.Console.WriteLine($"Root env metadata path: {AppEnvConfigContainer.Instance.GetEnvMetadataPath()}");
            System.Console.WriteLine($"Root env temp path: {AppEnvConfigContainer.Instance.GetEnvTempPath()}");
        }
    }
}
