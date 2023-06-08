import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/sys_user/login');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/account/me');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
