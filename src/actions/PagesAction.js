import request from './Config';

export function requestPage() {
  return {
    type: 'PAGE_REQUEST',
  };
}

export function requestFaq(data) {
  return dispatch => {
    dispatch({
      type: 'FAQ_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestContact(data) {
  return dispatch => {
    dispatch({
      type: 'CONTACT_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestInformation(data) {
  return dispatch => {
    dispatch({
      type: 'INFORMATION_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestTokenFcm(data) {
  return dispatch => {
    dispatch({
      type: 'FCM_TOKEN_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestPageFailed(message) {
  return {
    type: 'PAGE_REQUEST_FAILED',
    data: message,
  };
}

export const fetchFaq = token => {
  return dispatch => {
    dispatch(requestPage());
    request('get', `/faq?api_token=${token}`)
      .then(({data}) => {
        dispatch(requestFaq(data));
      })
      .catch(error => {
        dispatch(requestPageFailed(error));
      });
  };
};

export const fetchContact = token => {
  return dispatch => {
    dispatch(requestPage());
    request('get', `/contact?api_token=${token}`)
      .then(({data}) => {
        dispatch(requestContact(data));
      })
      .catch(error => {
        dispatch(requestPageFailed(error));
      });
  };
};

export const fetchInformation = token => {
  return dispatch => {
    dispatch(requestPage());
    request('get', `/information?api_token=${token}`)
      .then(({data}) => {
        dispatch(requestInformation(data));
      })
      .catch(error => {
        dispatch(requestPageFailed(error));
      });
  };
};

export const saveFcmToken = token => {
  return dispatch => {
    dispatch(requestTokenFcm(token));
  };
};
