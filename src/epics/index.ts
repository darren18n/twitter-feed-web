import { from, of } from "rxjs";
import { catchError, mergeMap, map } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import actions, { IAction } from "../actions";
import { constants as C } from "../actions/constants";
import FileImportService from "../services/file-import-service";
import TweetFeedService from '../services/tweet-feed-service';
import UserService from '../services/user-service';

const importDataEpic: Epic<IAction> = (action$, state) =>
  action$.pipe(
    ofType(C.IMPORT_DATA),
    mergeMap(action =>
      from(FileImportService.importFiles(action.payload)).pipe(
        map((response: any) => actions.importDataSuccess(response)),
        catchError(error => of(actions.importDataFailure(error), actions.displayError("Import Error", error.message)))
      )
    )
  );

  const fetchTweetDataEpic: Epic<IAction> = (action$, state) =>
  action$.pipe(
    ofType(C.FETCH_TWEET_DATA),
    mergeMap(action =>
      from(TweetFeedService.getTweets()).pipe(
        map((response: any) => actions.fetchTweetDataSuccess(response)),
        catchError(error => of(actions.fetchTweetDataFailure(error), actions.displayError("Fetch Error", error.message)))
      )
    )
  );

  const fetchUserDataEpic: Epic<IAction> = (action$, state) =>
  action$.pipe(
    ofType(C.FETCH_USER_DATA),
    mergeMap(action =>
      from(UserService.getUsers()).pipe(
        map((response: any) => actions.fetchUserDataSuccess(response)),
        catchError(error => of(actions.fetchUserDataFailure(error), actions.displayError("Fetch Error", error.message)))
      )
    )
  );

export default [importDataEpic, fetchTweetDataEpic, fetchUserDataEpic];
