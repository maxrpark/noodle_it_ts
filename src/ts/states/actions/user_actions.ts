import { ActionType } from '../action-types';
import { NoodleDetails, userDetails } from '../../interfaces/global_interfaces';

interface LogInInterface {
  access: string;
  refresh: string;
}
interface SetUserFavInterface {
  noodle: NoodleDetails;
}

interface LOG_IN {
  type: ActionType.LOG_IN;
  payload: LogInInterface;
}

interface GET_USER_DETAILS {
  type: ActionType.GET_USER_DETAILS;
  payload: userDetails;
}
interface LOG_BACK {
  type: ActionType.LOG_BACK;
}
interface TOOGLE_FORM {
  type: ActionType.TOOGLE_FORM;
}
interface LOG_OUT_USER {
  type: ActionType.LOG_OUT_USER;
}
interface LOAD_NOODLES {
  type: ActionType.LOAD_NOODLES;
  payload: NoodleDetails[];
}
interface GET_FAVORITES_NOODLES {
  type: ActionType.GET_FAVORITES_NOODLES;
  payload: NoodleDetails[];
}
interface IS_USER_FAVORITE_NOODLE {
  type: ActionType.IS_USER_FAVORITE_NOODLE;
  payload: NoodleDetails | {};
}
interface SET_USER_FAVORITES_NOODLE {
  type: ActionType.SET_USER_FAVORITES_NOODLE;
  payload: SetUserFavInterface;
}

export type Actions =
  | LOG_IN
  | GET_USER_DETAILS
  | LOG_BACK
  | TOOGLE_FORM
  | LOG_OUT_USER
  | GET_FAVORITES_NOODLES
  | IS_USER_FAVORITE_NOODLE
  | LOAD_NOODLES
  | SET_USER_FAVORITES_NOODLE;
