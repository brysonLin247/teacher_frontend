import { request } from 'umi';

export async function getStudents(
  params: {
    sno?: string;
    name?: string;
    college?: number;
    major?: number;
    className?: number;
    year?: number;
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return request<ResearchList>('student', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
  });
}

export async function createStudent(body?: any) {
  const res = await request('student', {
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

export async function deleteStudent(id: number) {
  return request(`student/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
}

export async function editStudent(id: number, body: any) {
  return request<Record<string, any>>(`student/${id}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
}