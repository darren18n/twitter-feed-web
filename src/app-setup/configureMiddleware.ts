// @flow
import { createEpicMiddleware } from "redux-observable";

export const epicMiddleware = createEpicMiddleware();

const configureMiddleware = (initialState: any, platformDeps: any, platformMiddleware: any) => {
  // @ts-ignore
  const middleware = [epicMiddleware, ...platformMiddleware];
  return middleware;
};

export default configureMiddleware;
