
export const sztuCollege = {
  1: '大数据与互联网学院',
  2: '中德智能制造学院',
  3: '城市交通与物流学院',
  4: '新材料与新能源学院',
  5: '健康与环境工程学院',
  6: '创意设计学院',
}

export const sztuMajor = {
  1: '计算机科学与技术',
  2: '物联网工程',
  3: '机械设计制造及其自动化',
  4: '电子科学与技术',
  5: '自动化',
  6: '交通运输',
  7: '汽车服务工程',
  8: '车辆工程',
  9: '物流管理',
  10: '光源与照明',
  11: '新能源科学与工程',
  12: '生物医学工程',
  14: '工业设计',
  15: '环境设计'
}

export const judgeSztuCollege = (college: number) => {
  switch (college) {
    case 1: return { 1: '计算机科学与技术', 2: '物联网工程' }
    // case 2: return ['机械设计制造及其自动化', '电子科学与技术', '自动化']
    // case 3: return ['交通运输', '汽车服务工程', '车辆工程', '物流管理']
    // case 4: return ['光源与照明', '新能源科学与工程']
    // case 6: return ['生物医学工程']
    // case 7: return ['工业设计', '环境设计']
    default: return {};
  }
}

export const hssfCollege = {
  1: '数字与统计学院',
  2: '外国语学院',
  3: '材料科学与工程学院',
}

export const hssfMajor = {
  1: '数学与应用数学(师范)',
  2: '信息与计算科学',
  3: '统计学',
  4: '数据科学与大数据技术',
  5: '英语（师范）',
  6: '日语',
  7: '商务英语',
  8: '材料科学与工程',
  9: '无机非金属材料工程',
}


export const transform = (obj: any) => {
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push({
      label: value,
      value: Number(key)
    })
  }
  return arr;
}



// [{
//   label: 'item 1',
//   value: 'a',
// },]