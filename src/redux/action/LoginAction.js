import * as type from '../types';

export function login(payload) {
    return {
      type: type.LOGIN,
      payload
    }
}
export function refresh() {
  return {
    type: type.REFRESH
  }
}
 