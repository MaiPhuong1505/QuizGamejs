import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from '../../utils/fetchData';
import { persistor } from '../store';

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    console.log('login');
    const res = await postDataAPI('login', data);
    console.log('data login', res);
    if (sessionStorage.getItem('flashcardData')) {
      const tempData = JSON.parse(sessionStorage.getItem('flashcardData'));
      const sentData = { ...tempData, user: res?.data?.user?._id };
      const newFlashcards = await postDataAPI(`flashcards/save`, sentData, res?.data?.access_token);
      console.log('newFlashcards', newFlashcards);
    }
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem('logged in', true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    console.log('err', err);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

// export const refreshToken = () => async (dispatch) => {
//   const firstLogin = localStorage.getItem('firstLogin');
//   if (firstLogin) {
//     dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

//     try {
//       const res = await postDataAPI('refresh_token');
//       dispatch({
//         type: GLOBALTYPES.AUTH,
//         payload: {
//           token: res.data.access_token,
//           user: res.data.user,
//         },
//       });

//       dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
//     } catch (err) {
//       dispatch({
//         type: GLOBALTYPES.ALERT,
//         payload: {
//           error: err.response.data.msg,
//         },
//       });
//     }
//   }
// };

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await postDataAPI('register', data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem('logged in', true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('firstLogin');
    await postDataAPI('logout');
    // window.location.href = '/';
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: '',
        user: null,
      },
    });
    persistor.purge();
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
