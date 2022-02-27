const initialState = {
  isLoading: false,
  data: '',
  isRegister:'',
  isLogin:new Date(),
  dataLogin:'',
  dataFailed:''
}
export function authReducer (state = initialState, action){
    switch(action.type){

        case 'AUTH_REQUEST':
            return{
                ...state,
                isLoading: true,
            }
        case 'REGISTER_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                isRegister: action.data,
               
            }
         case 'LOGIN_REQUEST_SUCCESS':
            return{
                ...state, 
                isLoading: false, 
                isLogin: new Date(),
                dataLogin: action.data,
            }
          case 'LOGIN_REQUEST_FAILED':
            return{
                ...state, 
                isLoading: false, 
                isLogin: new Date(),
                dataFailed: action.data
            }
        default: {
            return state
        }
            
    }
}