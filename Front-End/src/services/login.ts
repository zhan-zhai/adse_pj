import request from '@/utils/request';
import urlConfig from "@/urlConfig";

export type LoginParamsType = {
  username: string;
  password: string;
  register_type: string;
  register_username: string;
  register_password: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/sys_user/login', {
    method: 'POST',
    data: params,
  });
}

export async function userLogin(params: LoginParamsType) {
  return request(urlConfig.LOGIN_URL, {
    method: 'POST',
    data: params,
  });
}

export async function userRegister(params: LoginParamsType) {
  return request(urlConfig.REGISTER_URL, {
    method: 'POST',
    data: params,
  });
}

export async function accountLogout() {
  return request(urlConfig.LOGOUT_URL, {
    method: 'POST',
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/user/login/captcha?mobile=${mobile}`);
}
