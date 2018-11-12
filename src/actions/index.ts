import { error as notificationError, warning as notificationWarning } from 'react-notification-system-redux';
import { constants as C } from "./constants";
import Guid from '../../src/models/guid';

export interface IAction {
  type: string;
  payload: any;
  metadata: object;
  error: boolean;
}

export function importData(formData: FormData): IAction {
  return {
    type: C.IMPORT_DATA,
    payload: formData,
    metadata: {},
    error: false
  };
}

export function importDataSuccess(response: object): IAction {
  return {
    type: C.IMPORT_DATA_SUCCESS,
    payload: response,
    metadata: {},
    error: false
  };
}

export function importDataFailure(error: object): IAction {
  return {
    type: C.IMPORT_DATA_FAILURE,
    payload: error,
    metadata: {},
    error: true
  };
}

export function fetchTweetData(): IAction {
  return {
    type: C.FETCH_TWEET_DATA,
    payload: null,
    metadata: {},
    error: false
  };
}

export function fetchTweetDataSuccess(response: object): IAction {
  return {
    type: C.FETCH_TWEET_DATA_SUCCESS,
    payload: response,
    metadata: {},
    error: false
  };
}

export function fetchTweetDataFailure(error: any): IAction {
  return {
    type: C.FETCH_TWEET_DATA_FAILURE,
    payload: error,
    metadata: {},
    error: false
  };
}

export function fetchUserData(): IAction {
  return {
    type: C.FETCH_USER_DATA,
    payload: null,
    metadata: {},
    error: false
  };
}

export function fetchUserDataSuccess(response: object): IAction {
  return {
    type: C.FETCH_USER_DATA_SUCCESS,
    payload: response,
    metadata: {},
    error: false
  };
}

export function fetchUserDataFailure(error: any): IAction {
  return {
    type: C.FETCH_USER_DATA_FAILURE,
    payload: error,
    metadata: {},
    error: false
  };
}

export function displayWarning(title: string, message: string): IAction {
  const options = {
    uid: Guid.newGuid(),
    title,
    message,
    position: 'tr',
    autoDismiss: 3,
  };
  // @ts-ignore
  return notificationWarning(options);
}
export function displayError(title: string, message: string): IAction {
  const options = {
    uid: Guid.newGuid(),
    title,
    message,
    position: 'tr',
    autoDismiss: 3,
  };
  // @ts-ignore
  return notificationError(options);
}

const actions = {
  importData,
  importDataSuccess,
  importDataFailure,
  fetchTweetData,
  fetchTweetDataSuccess,
  fetchTweetDataFailure,
  fetchUserData,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  displayWarning,
  displayError
}

export default actions;