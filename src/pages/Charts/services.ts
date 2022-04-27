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