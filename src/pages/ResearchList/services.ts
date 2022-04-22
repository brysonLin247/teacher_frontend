import { request } from 'umi';

/** 获取规则列表 GET /api/base */
export async function getResearches(
  params: {
    // query
    researchName?: string;
    field?: number;
    category?: number;
    review?: number;
    reviewer?: string
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return request<ResearchList>('research', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
  });
}

export async function uploadFile(data: any) {
  const { file, type, researchId } = data;
  const res = await request('upload/file', {
    requestType: 'form',
    method: 'POST',
    data: file,
    params: {
      type, researchId
    }
  });
  return res;
}

export async function uploadFiles(data: any) {
  const { files, type, researchId } = data;
  const res = await request('upload/files', {
    requestType: 'form',
    method: 'POST',
    data: files,
    params: {
      type, researchId
    }
  });
  return res;
}

export async function editFile(data: any) {
  const { files, type, id } = data;
  const res = await request('upload/files', {
    requestType: 'form',
    method: 'PATCH',
    data: files,
    params: {
      type, id
    }
  });
  return res;
}

export async function createResearch(body?: any) {
  return await request('research', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
// export async function createBase(body?: any) {
//   const res = await request('base', {
//     method: 'POST',
//     body: JSON.stringify(body),
//   });
//   return {
//     data: res.data?.data || [],
//     total: res.total
//   }
// }

export async function deleteResearch(id: number) {
  return request<Record<string, any>>(`research/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function editResearch(id: number, body: any) {
  return request<Record<string, any>>(`research/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
}

export async function downloadFile(subPath: string) {
  return request<Record<string, any>>(`static/${subPath}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getResearchFileById(params: any) {
  return request<Record<string, any>>('upload', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params
  });
}