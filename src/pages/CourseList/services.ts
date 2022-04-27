import { request } from "umi";

export async function getCourses(
  params: {
    cname?: string;
    college?: number;
    major?: number;
    className?: number;
    location?: string;
    hour?: number;
    way?: number;
    year?: number;
    semester?: number;
    filter?: boolean;
    baseId?: number;
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return request<ResearchList>('course', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
  });
}

export async function createCourse(body?: any) {
  return await request('course', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export async function deleteCourse(id: number) {
  return request(`course/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  });
}

export async function editCourse(id: number, body: any) {
  return request<Record<string, any>>(`course/${id}`, {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });
}

// export async function createAchievement(body?: any) {
//   return await request('achievement', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//   });
// }

export async function updateAchievement(body?: any) {
  console.log(body);
  return await request(`achievement`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}