import { request } from 'umi';
export async function getBaseCharts(
) {
  return request('base/status', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function getStudentCharts(
) {
  return request('student/college', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function getAllData(
) {
  return request('all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function getBase(id: number) {
  return request(`base/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function getTeacherData(id: number) {
  return request(`all/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}