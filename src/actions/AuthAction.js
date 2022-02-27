import request, {requestWithToken} from './Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function requestLogin() {
  return {
    type: 'AUTH_REQUEST',
  };
}

export function requestRegisterUser(data) {
  return dispatch => {
    dispatch({
      type: 'REGISTER_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestLoginSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestRefreshTokenSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'REFRESH_TOKEN_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestChangePasswordSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_PASSWORD_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestLoginFailed(message) {
  return {
    type: 'LOGIN_REQUEST_FAILED',
    data: message,
  };
}

export function logout() {
  return {
    type: 'LOGIN_RESET',
  };
}

export function invalidate() {
  return {
    type: 'INVALIDATE',
  };
}

export function requestFailed(data) {
  return dispatch => {
    dispatch({
      type: 'FAILED_REQUEST_SUCCESS',
      data: data,
    });
  };
}
export const loginWithGmail = params => {
  return dispatch => {
    const {name, email, fcmToken} = params;
    const requestParams = {
      name,
      email,
      fcmToken,
    };
    console.log(requestParams);
    dispatch(requestLogin());
    request('post', `/loginwithgmail`, requestParams)
      .then(({data}) => {
        console.log(data);
        if (data.success === true) {
          AsyncStorage.setItem('token', data.api_token);
          AsyncStorage.setItem('id_user', JSON.stringify(data.message.id));
          AsyncStorage.setItem('name', data.message.name);
          AsyncStorage.setItem('role', data.message.role);
          dispatch(requestLoginSuccess(data));
        } else {
          dispatch(requestLoginFailed(data));
        }
      })
      .catch(error => {
        console.log({error});

        dispatch(requestLoginFailed(error));
      });
  };
};
export const loginWithFb = params => {
  return dispatch => {
    const {name, id, fcmToken} = params;
    const requestParams = {
      name,
      id,
      fcmToken,
    };
    console.log(requestParams);
    dispatch(requestLogin());
    request('post', `/loginwithfb`, requestParams)
      .then(({data}) => {
        console.log(data);
        if (data.success === true) {
          AsyncStorage.setItem('token', data.api_token);
          AsyncStorage.setItem('id_user', JSON.stringify(data.message.id));
          AsyncStorage.setItem('name', data.message.name);
          AsyncStorage.setItem('role', data.message.role);
          dispatch(requestLoginSuccess(data));
        } else {
          dispatch(requestLoginFailed(data));
        }
      })
      .catch(error => {
        console.log({error});

        dispatch(requestLoginFailed(error));
      });
  };
};
export const loginUser = params => {
  return dispatch => {
    const {password, email, fcmToken} = params;
    const requestParams = {
      password,
      email,
      fcmToken,
    };
    console.log(requestParams);
    dispatch(requestLogin());
    request('post', `/login`, requestParams)
      .then(({data}) => {
        console.log(data);
        if (data.success === true) {
          AsyncStorage.setItem('token', data.api_token);
          AsyncStorage.setItem('id_user', JSON.stringify(data.message.id));
          AsyncStorage.setItem('name', data.message.name);
          AsyncStorage.setItem('role', data.message.role);
          dispatch(requestLoginSuccess(data));
        } else {
          dispatch(requestLoginFailed(data));
        }
      })
      .catch(error => {
        console.log({error});

        dispatch(requestLoginFailed(error));
      });
  };
};

export const registerUser = params => {
  return dispatch => {
    const {password, email, name, phone, role} = params;
    const requestParams = {
      password,
      email,
      name,
      phone,
      role: 'user',
    };
    dispatch(requestLogin());
    request('post', `/register`, requestParams)
      .then(({data}) => {
        console.log(data);
        dispatch(requestRegisterUser(data));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestLoginFailed(error));
      });
  };
};

export const changePassword = (token, params) => {
  return dispatch => {
    const {oldPassword, newPassword, newConfirmPassword, adminId, agentId} =
      params;
    const requestParams = {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: newConfirmPassword,
    };
    dispatch(requestLogin());
    requestWithToken(
      token,
      'put',
      `/auth/password/change/${adminId}/${agentId}`,
      requestParams,
    )
      .then(({data}) => {
        //console.log(data)
        dispatch(requestChangePasswordSuccess(data));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestLoginFailed(error));
      });
  };
};
