const initialState = {
  isLoading: false,
  dataAdd: '',
  isAdd:new Date(),
  isUpdate:new Date(),
  dataUpdate:'',
  dataFailed:'',
  dataReportUser: '',
  dataProgress:'',
  dataReportAll:[],
  dataProgressAdmin:'',
  dataReportMessage:''
}
export function reportReducer (state = initialState, action){
    switch(action.type){

        case 'REPORT_REQUEST':
            return{
                ...state,
                isLoading: true,
            }
        
         case 'ADD_REPORT_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                isAdd: new Date(),
                dataAdd: action.data,
            }
          case 'ADD_REPORT_UPDATE_STATUS_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                isUpdate: new Date(),
                dataUpdate: action.data,
            }
            

          case 'FETCH_REPORT_USER_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataReportUser: action.data,
            }
          case 'FETCH_REPORT_ALL_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataReportAll: action.data,
                dataReportMessage: action.message
            }
          case 'FETCH_PROGRESS_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataProgress: action.data,
            }
          case 'FETCH_PROGRESS_ADMIN_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataProgressAdmin: action.data,
            }
            
         case 'FAILED_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataFailed:action.data,
               
            }
        default: {
            return state
        }
            
    }
}