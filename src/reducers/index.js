import { combineReducers } from 'redux'
import { authReducer } from './AuthReducer'
import { reportReducer } from './ReportReducer'
import { pageReducer } from './PageReducer'

export default combineReducers({
    auth: authReducer,
    report: reportReducer,
    page:pageReducer
})