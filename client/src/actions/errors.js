import {
    RESET_ALL_ALERTS
} from './types'

export const resetAllAlerts = () => async dispatch => {
    dispatch({
        type: RESET_ALL_ALERTS
    })
}