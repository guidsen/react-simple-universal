import universal from 'react-simple-universal/client';
import reducers from 'reducers';

import createRoutes from 'routes';

const store = universal({ createRoutes, reducers });

store.dispatch({ type: 'ACTION_AFTER_LOADING' });
