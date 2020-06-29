import {
  FULFILLED,
  PENDING,
  REJECTED
} from 'redux-promise-middleware'

export const NOT_ASKED = 'notAsked'
export const SUCCESS = 'success'
export const LOADING = 'pending'
export const ERROR = 'rejected'

export default function createActionStatus (action) {
  return function createActionType (type) {
    switch (type) {
      case SUCCESS:
        return `${action}_${FULFILLED}`
      case ERROR:
        return `${action}_${REJECTED}`
      case LOADING:
        return `${action}_${PENDING}`
      default:
        throw new Error('No action found')
    }
  }
}
