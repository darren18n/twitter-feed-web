import { combineEpics, ActionsObservable } from "redux-observable";
import { Epic } from "redux-observable";
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from "rxjs/operators";
import { IAction } from 'src/actions';
import appEpics from "../epics";

const epics: any[] = [...appEpics];
const epic$ = new BehaviorSubject(combineEpics(...epics));

export const rootEpic = (action$: ActionsObservable<IAction>, store: any) =>
  epic$.pipe(mergeMap((epic: Epic) => epic(action$, store, null)));
