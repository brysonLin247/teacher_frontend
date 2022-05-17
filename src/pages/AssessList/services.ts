import { request } from 'umi';

/** 获取规则列表 GET /api/base */
export async function getAssess(
  params: {
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return request<API.RuleList>('assess', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
  });
}

export async function createBase(body?: any) {
  const res = await request('base', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return {
    data: res.data?.data || [],
    total: res.total
  }
}

export async function deleteBase(data: number[]) {
  return request<Record<string, any>>(`base`, {
    data,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
}

export async function editBase(id: number, body: any) {
  return request<Record<string, any>>(`base/${id}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
  });
}

export async function assignCourses(id: number, body: any) {
  return request<Record<string, any>>(`base/assign/${id}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
}

