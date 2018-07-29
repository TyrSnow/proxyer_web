import { Action } from 'redux';
import { AuthState } from '../index.d';

export interface AuthAction extends Action {
  token: string,
  user: AuthState,
}
