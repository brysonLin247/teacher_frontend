import { request } from 'umi';

/** 获取规则列表 GET /api/base */
export async function getUserInfo(
  id: number
) {
  return request(`base/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function editBase(id: number, body: any) {
  return request(`base/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}