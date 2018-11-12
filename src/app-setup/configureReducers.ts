import {combineReducers}from "redux";
import {reducer as notifications} from "react-notification-system-redux";
import { dataReducer } from "../reducers"

function configureReducers(reducers: object) {
  return combineReducers({
    ...reducers,
    notifications,
    dataReducer
  })
}
export default configureReducers;