import { expressDevServer } from 'react-simple-universal';
import universal from 'react-simple-universal/server';
import config from './webpack.config';
import createRoutes from 'routes';
import reducers from 'reducers';

const routes = createRoutes();

universal({ routes, reducers, app: expressDevServer(config) });
