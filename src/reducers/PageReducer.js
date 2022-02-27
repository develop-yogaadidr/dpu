const initialState = {
  isLoading: false,
  dataFaq:'',
  dataContact:'',
  dataInformation:'',
  dataFcm:''
}
export function pageReducer (state = initialState, action){
    switch(action.type){

        case 'PAGE_REQUEST':
            return{
                ...state,
                isLoading: true,
            }
        
         case 'FAQ_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataFaq: action.data.message,
            }
          case 'CONTACT_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataContact: action.data.message,
            }
         case 'INFORMATION_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                dataInformation: action.data.message,
            }
          case 'FCM_TOKEN_REQUEST_SUCCESS':
            return{
                ...state, 
                dataFcm: action.data,
            }
            

         case 'PAGE_REQUEST_FAILED':
            return{
                ...state, 
                isLoading: false, 
            }
        default: {
            return state
        }
            
    }
}