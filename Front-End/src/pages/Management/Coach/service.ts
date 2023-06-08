import request from '@/utils/request';
import type { TableListParams } from './data';
import urlConfig from '@/urlConfig';
import { TableListItem } from './data';


export async function queryItem(params?: TableListParams) {
  return request(urlConfig.COACH_URL, {
    ...params,
  });
}

export async function removeItem(id: number) {
  return request(`${urlConfig.COACH_URL}/${id}`, {
    method: 'DELETE',
  });
}

export async function addItem(params: TableListItem) {
  return request(urlConfig.COACH_URL, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateItem(id: number, params: TableListItem) {
  return request(`${urlConfig.COACH_URL}/${id}`, {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
