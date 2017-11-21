import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from '@store/create';
import router from './router';
import platform from '@platform/reactotron';

import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import events from '@utils/Events'

// Styles
// TODO: Switch to a per-module CSS
import 'react-widgets/lib/less/react-widgets.less';
import './frontend/index.scss';
import 'font-awesome-webpack';

// Global init
const init = () => {
  momentLocalizer(moment);
};

init();

events.track("Webpage Opened");

// Store
const store = createStore();

// Router
const history = syncHistoryWithStore(browserHistory, store);

// Segment Analytics Tracking
history.listen((location) => {
  events.page(location.pathname, {
    'action' : location.action,
    'key' : location.key
  });
});

// App
const App = () => {
  return router(store, history);
};

render(<App />, document.getElementById('root'))
