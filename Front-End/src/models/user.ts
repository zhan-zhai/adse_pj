import type { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers } from '@/services/user';

export type CurrentUser = {
  avatar?: string;
  username?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  id?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({callback}, { call, put }) {
      const response = yield call(queryCurrent);
      console.log("before save user query current")
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          // notifyCount: action.payload.totalCount,
          // unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
