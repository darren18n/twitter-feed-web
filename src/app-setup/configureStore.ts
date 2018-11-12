import { applyMiddleware, compose, createStore } from "redux";
import configureMiddleware, { epicMiddleware } from "./configureMiddleware";
import configureReducer from "./configureReducers";
import { rootEpic } from "./configureEpics";

// @ts-ignore
const reduxExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const configureStore = (options: any) => {
  const {
    initialState = {},
    platformDeps = {},
    platformMiddleware = [],
    platformReducers = {},
    platformStoreEnhancers = []
  } = options;

  const reducer = configureReducer(platformReducers);

  const middleware = configureMiddleware(initialState, platformDeps, platformMiddleware);

  const composeEnhancers = typeof window === "object" && reduxExtension ? reduxExtension : compose;
  const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleware), ...platformStoreEnhancers));
  epicMiddleware.run(rootEpic);
  return store;
};

export default configureStore;
