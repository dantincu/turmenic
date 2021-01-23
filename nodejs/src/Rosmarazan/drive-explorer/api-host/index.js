require('dotenv').config();
import './src.common.server/utils/appSettings/appEnvAutoload.js';

import { ApolloServer } from  ('apollo-server');
import isEmail from 'isemail';
import typeDefs from ('./src/schema/schema.js');
import resolvers from './src/resolvers.js'
import { createStore } from './src/utils/utils.js'
