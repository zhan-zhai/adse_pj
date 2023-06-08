import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import {accountLogout, userLogin, userRegister} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, notificationAck } from '@/utils/utils'
import { message } from 'antd';
import urlConfig from '@/urlConfig'
import request from '@/utils/request';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'seller' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

// @ts-ignore
const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      // Login successfully
      if (response.code === '000') {
        const currentAuthority: any[] = [];
        console.log(response)
        console.log(response.data.authorities)
        response.data.authorities.forEach(
            (a: any)=>{
              currentAuthority.push(a.authority.replace("ROLE_", "").toLowerCase())
            }
        );

        var loc = window.location
        var new_uri = ''
        if (loc.protocol === 'https:') {
          new_uri = 'wss:'
        } else {
          new_uri = 'ws:'
        }
        new_uri += '//' + loc.host + `${urlConfig.WEB_SOCKETS_URL}/${response.data.id}`
        console.log(new_uri)
        var ws = new WebSocket(new_uri)

        ws.onopen = function(evt) {
          console.log("Connection open ...");
          ws.send("链接web sockets!");
        };

        ws.onmessage = function(evt) {
          console.log(evt.data)
          try{
            var notification = JSON.parse(evt.data)
            message.success(`通知：${notification.msg}`);
            notificationAck(notification.id)
          }catch (e){
            console.log("json parse false: " + evt.data)
            message.success(`通知：${evt.data}`);
          }
        };

        ws.onclose = function(evt) {
          console.log("Connection closed.");
        };
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'ok',
            currentAuthority,
            type: "account"
          },
        });
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      }else {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            currentAuthority: undefined,
            type: "account"
          },
        });
      }
    },
    // @ts-ignore
    * register({ payload }, { call, put }) {
      // @ts-ignore
      const response = yield call(userRegister, payload);
      // Login successfully
      if (response.code === '000') {
        message.success('🎉 🎉 🎉  注册成功！');
      } else{
        message.error(response.msg)
      }
    },

    *logout({ payload }, { call, put }) {
      yield call(accountLogout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: undefined,
          currentAuthority: null,
          type: "account"
        },
      });
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login') {
        history.replace({
          pathname: '/user/login',
          // search: stringify({
          //   redirect: window.location.href,
          // }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};

export default Model;
