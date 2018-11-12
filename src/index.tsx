import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/app/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './app-setup/configureStore';
import './index.css';

const store = configureStore({
  initialState: {},
  platformReducers: {},
  platformMiddleware: []
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
