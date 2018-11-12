import { dataReducer } from "../../reducers";
import actions from "../../actions";
import { response } from "./import.response";
import { state } from "./import.state";

​
describe('data reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      tweets: {},
      users: {},
      importData: []
    };
    // @ts-ignore
    expect(dataReducer(undefined, {})).toEqual(initialState)
  })
​
  it('should handle IMPORT_DATA_SUCCESS', () => {
    const initialState = {
      tweets: {},
      users: {},
      importData: []
    };

    const importSuccessAction = actions.importDataSuccess(response);
    expect(dataReducer(initialState, importSuccessAction)).toEqual(state)
  })

  it('should handle IMPORT_DATA_FAILURE', () => {
    const error = new Error("Async Error");

    const initialState = {
      tweets: {},
      users: {},
      importData: []
    };

    const importSuccessAction = actions.importDataFailure(error);
    expect(dataReducer(initialState, importSuccessAction)).toEqual(initialState)
  })
})