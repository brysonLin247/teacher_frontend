import { request } from 'umi';

export async function getDocuments(
  params: {
    // query
    title?: string;
    type?: number;
    content?: string;
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return request<ResearchList>('documents', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
  });
}

export async function createDocuments(data?: any) {
  return await request('documents', {
    method: 'POST',
    requestType: 'form',
    data
  });
}

export async function editDocuments(data?: any) {
  return await request(`documents`, {
    method: 'PATCH',
    requestType: 'form',
    data
  });
}

export async function deleteDocuments(id: number) {
  return await request(`documents/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getDocument(id: number) {
  return await request(`documents/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}