import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import AppLayout from '@crema/core/AppLayout';
import AuthRoutes from '@crema/utility/AuthRoutes';
import LocaleProvider from '@crema/utility/LocaleProvider';
import CremaThemeProvider from '@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '@crema/utility/CremaStyleProvider';
import ContextProvider from '@crema/utility/ContextProvider';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import configureStore, {history} from './redux/store';
import CssBaseline from '@material-ui/core/CssBaseline';

const store = configureStore();
// Create a client
export const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ContextProvider>
      <Provider store={store}>
        <CremaThemeProvider>
          <CremaStyleProvider>
            <LocaleProvider>
              <ConnectedRouter history={history}>
                <AuthRoutes>
                  <CssBaseline />
                  <AppLayout />
                </AuthRoutes>
              </ConnectedRouter>
            </LocaleProvider>
          </CremaStyleProvider>
        </CremaThemeProvider>
      </Provider>
    </ContextProvider>
  </QueryClientProvider>
);

export default App;
