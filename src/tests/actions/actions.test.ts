import actions from "../../actions";
import { constants } from "../../actions/constants";

​
describe('actions', () => {
  it('should create an action to import data', () => {
    const formData = new FormData()

    const expectedAction = {
      type: constants.IMPORT_DATA,
      payload: formData,
      metadata: {},
      error: false
    }
    expect(actions.importData(formData)).toEqual(expectedAction);
  })

  it('should create an action to fetch tweet data', () => {
    const expectedAction = {
      type: constants.FETCH_TWEET_DATA,
      payload: null,
      metadata: {},
      error: false
    }
    expect(actions.fetchTweetData()).toEqual(expectedAction);
  })

  it('should create an action to fetch user data', () => {
    const expectedAction = {
      type: constants.FETCH_USER_DATA,
      payload: null,
      metadata: {},
      error: false
    }
    expect(actions.fetchUserData()).toEqual(expectedAction);
  })
})