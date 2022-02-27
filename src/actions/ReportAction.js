import request, {requestFormData} from './Config';

export function requestReport() {
  return {
    type: 'REPORT_REQUEST',
  };
}

export function requestAddSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'ADD_REPORT_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestUpdateStatusSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'ADD_REPORT_UPDATE_STATUS_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestFetchReportUserSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'FETCH_REPORT_USER_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestFetchReportAllSuccess(data, message) {
  return dispatch => {
    dispatch({
      type: 'FETCH_REPORT_ALL_REQUEST_SUCCESS',
      data: data,
      message: message,
    });
  };
}

export function requestFetchProgressSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'FETCH_PROGRESS_REQUEST_SUCCESS',
      data: data,
    });
  };
}

export function requestFetchProgressAdminSuccess(data) {
  return dispatch => {
    dispatch({
      type: 'FETCH_PROGRESS_ADMIN_REQUEST_SUCCESS',
      data: data,
    });
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

export const addReport = (token, params) => {
  return dispatch => {
    dispatch(requestReport());
    requestFormData('post', `/report?api_token=${token}`, params)
      .then(({data}) => {
        console.log(data);

        dispatch(requestAddSuccess(data));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestFailed(error));
      });
  };
};

export const reportByUser = (token, id_user) => {
  return dispatch => {
    dispatch(requestReport());
    request('get', `/report/${id_user}?api_token=${token}`)
      .then(({data}) => {
        console.log(data);

        dispatch(requestFetchReportUserSuccess(data));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestFailed(error));
      });
  };
};

export const reportAll = (token, page, dataReport) => {
  return dispatch => {
    console.log(page);
    dispatch(requestReport());
    request('get', `/allreportlimit?page=${page}&api_token=${token}`)
      .then(({data}) => {
        console.log(data);
        console.log(dataReport);
        console.log(data.message.data);

        let parseData = data.message.data;
        if (dataReport) {
          //parseData = parsedData.slice(0)
          parseData = [...dataReport, ...data.message.data];
          //parseData = dataReport.concate(data.message.data[0])
          console.log(parseData);
        }

        dispatch(requestFetchReportAllSuccess(parseData, data.message));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestFailed(error));
      });
  };
};

export const fetchProgress = (token, id_user, id_report) => {
  return dispatch => {
    dispatch(requestReport());
    request('get', `/report/detail/${id_user}/${id_report}?api_token=${token}`)
      .then(({data}) => {
        console.log(data);

        dispatch(requestFetchProgressSuccess(data));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestFailed(error));
      });
  };
};

export const fetchProgressByAdmin = (token, id_report) => {
  return dispatch => {
    dispatch(requestReport());
    request('get', `/reportadmin/detail/${id_report}?api_token=${token}`)
      .then(({data}) => {
        console.log(data);

        dispatch(requestFetchProgressAdminSuccess(data));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestFailed(error));
      });
  };
};

export const updateReportStatus = (token, params) => {
  return dispatch => {
    dispatch(requestReport());
    requestFormData('post', `/update/report?api_token=${token}`, params)
      .then(({data}) => {
        console.log(data);

        dispatch(requestUpdateStatusSuccess(data));
      })
      .catch(error => {
        console.log({error});

        dispatch(requestFailed(error));
      });
  };
};
