import { IAction } from '../actions';
import { constants as C } from "../actions/constants";
import { TweetModel } from 'src/models/tweet-model';
import { UserModel } from 'src/models/user-model';
import { FollowerModel } from 'src/models/follower-model';

export interface IStoreState {
  tweets: object;
  users: object;
  importData: string[];
}

const initialState: IStoreState = {
  tweets: {},
  users: {},
  importData: []
};

export function dataReducer(state: IStoreState = initialState, action: IAction): IStoreState {
  switch (action.type) {
    case C.IMPORT_DATA_SUCCESS: {
      const { tweets, users, followers } = action.payload;

      const tweetDataMapping = Object.assign({}, state.tweets);
      tweets.forEach((tweet: TweetModel) => {
        tweetDataMapping[tweet.id] = tweet;
      });

      const userDataMapping = Object.assign({}, state.users);
      const userInfoMapping = { indexByName: {}, indexById: {} };

      users.forEach((user: UserModel) => {
        userInfoMapping.indexByName[user.screenName] = user;
        userInfoMapping.indexById[user.id] = user.screenName;

        if (!userDataMapping.hasOwnProperty(user.screenName)) {
          userDataMapping[user.screenName] = user;
        }
      });

      const followerMapping = {}
      followers.forEach((follower: FollowerModel) => {
        if (!followerMapping.hasOwnProperty(follower.follower_id)) {
          followerMapping[follower.follower_id] = [];
        }
        followerMapping[follower.follower_id].push(follower.user_id);
      });
      const result = generateOutput(userInfoMapping, followerMapping, tweets);
      const output = {tweets: tweetDataMapping, users: userDataMapping, importData: result };
      return {tweets: tweetDataMapping, users: userDataMapping, importData: result };
    }
    case C.IMPORT_DATA_FAILURE: {
      return Object.assign({}, state, { importData: [] });
    }
    case C.FETCH_TWEET_DATA_SUCCESS: {
      const tweets = action.payload;
      const tweetDataMapping = Object.assign({}, state.tweets);

      tweets.forEach((tweet: TweetModel) => {
        if (!tweetDataMapping.hasOwnProperty(tweet.id)) {
          tweetDataMapping[tweet.id] = tweet;
        }
      });
      return Object.assign({}, state, { tweets: tweetDataMapping });
    }
    default:
      return state;
  }
}

function generateOutput (userMapping: { indexByName: {}, indexById: {} }, followerMapping: object, tweets: TweetModel[]) {

  const result: string[] = [];
  const userList = Object.keys(userMapping.indexByName).sort();
  userList.forEach(name => {
    const user = userMapping.indexByName[name];
    let userIdList: string[] = [];

    if (followerMapping.hasOwnProperty(user.id)) {
      userIdList = followerMapping[user.id];
    }
    userIdList.push(user.id);

    result.push(name);
    tweets.forEach(tweet => {
      if (userIdList.indexOf(tweet.user_id) >= 0) {
        result.push("@" + userMapping.indexById[tweet.user_id] + ": " + tweet.message);
      }
    });
  });

  return result;

}
