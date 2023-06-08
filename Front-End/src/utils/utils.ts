import { parse } from 'querystring';
import { message } from 'antd';
import request from '@/utils/request';
import urlConfig from '@/urlConfig';
import ex from 'umi/dist';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// For the official demo site, it is used to turn off features that are not needed in the real development environment
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getItems = async (url: string, param: any) => {
  const hide = message.loading('加载数据...');
  try {
    const res = await request.get(url, {params:param});
    hide();
    if(res.code && res.code === '000'){
      message.success('获取列表成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;


  } catch (error) {
    hide();
    message.error(`请求错误2:${  error}`);
    return false;
  }
}

export const getOrderBystatus= async (url: string, status: number) => {
  const hide = message.loading('加载数据...');
  try {
    const res = await request.get(`${url}/${status}`);
    hide();
    if(res.code && res.code === '000'){
      message.success('获取列表成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;


  } catch (error) {
    hide();
    message.error(`请求错误2:${  error}`);
    return false;
  }
}

export const addItem = async (url: string, param: any) => {
  const hide = message.loading('新增数据...');
  try {
    const res = await request.post(url, {data:param});
    hide();
    if(res.code && res.code === '000'){
      message.success('新增数据成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}

export const updateOrder = async (url: string, param: any) => {
  const hide = message.loading('更新订单...');
  try {
    const res = await request.put(`${url}`, {data:param});
    hide();
    if(res.code && res.code === '000'){
      message.success('更新成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}

export const modifyAddress = async (url: string, param: any) => {
  const hide = message.loading('更新订单...');
  try {
    const res = await request.put(`${url}`, {data:param});
    hide();
    if(res.code && res.code === '000'){
      message.success('更新成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}

export const deliverOrder = async (url: string, id: number, name: string) => {
  const hide = message.loading('更新数据...');
  try {
    const res = await request.get(`${url}/${id}/${name}`);
    hide();
    if(res.code && res.code === '000'){
      message.success('更新成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}

export const updateItem = async (url: string, id: number, param: any) => {
  const hide = message.loading('更新数据...');
  try {
    const res = await request.put(`${url}/${id}`, {data:param});
    hide();
    if(res.code && res.code === '000'){
      message.success('更新成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}

export const notificationAck = async (id: number) => {
  try {
    const res = await request.put(`${urlConfig.NOTIFICATION_ACK_URL}/${id}`);
    if(res.code && res.code === '000'){
      return res;
    }
    if(res.code && res.code !== '000'){
      return false;
    }
    return false;

  } catch (error) {
    return false;
  }
}

export const deleteItem = async (url: string, id: number) => {
  const hide = message.loading('删除数据...');
  try {
    const res = await request.delete(`${url}/${id}`);
    hide();
    if(res.code && res.code === '000'){
      message.success('删除数据成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}

export const payOrder = async (url:string, id: number) => {
  const hide = message.loading('付款...');
  try {
    const res = await request.put(`${url}/${id}`);
    hide();
    if(res.code && res.code === '000'){
      message.success('付款成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}

export const confirmOrder = async (url:string, id: number) => {
  const hide = message.loading('付款...');
  try {
    const res = await request.put(`${url}/${id}`);
    hide();
    if(res.code && res.code === '000'){
      message.success('收货成功！');
      return res;
    }
    if(res.code && res.code !== '000'){
      message.error(`请求错误:${  res.msg}`);
      return false;
    }
    message.error(`请求错误:${  res.message}`);
    return false;

  } catch (error) {
    hide();
    message.error(`请求错误:${  error}`);
    return false;
  }
}



export const getVideoTypes = async () => {
  const res = await request.get(urlConfig.VIDEO_TYPE)
  if(res.code === '000'){
    return res.data;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAudioTypes = async () => {
  const res = await request.get(urlConfig.AUDIO_TYPE)
  if(res.code === '000'){
    return res.data;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getSexes = async () => {
  const res = await request.get(urlConfig.SUITABLE_SEX_TYPE)
  if(res.code === '000'){
    return res.data;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getDifficultyTypes = async () => {
  const res = await request.get(urlConfig.DIFFICULTY_TYPE)
  if(res.code === '000'){
    return res.data;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getSpecializedCourseTypes = async () => {
  const res = await request.get(urlConfig.SPECIALIZED_COURSE_TYPE)
  if(res.code === '000'){
    return res.data;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllAiArgs = async () => {
  const res = await request.get(urlConfig.AI_ARG_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllVideos = async () => {
  const res = await request.get(urlConfig.VIDEO_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllAudios = async () => {
  const res = await request.get(urlConfig.AUDIO_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllBodyParts
  = async () => {
  const res = await request.get(urlConfig.BODY_PART_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllCoaches
  = async () => {
  const res = await request.get(urlConfig.COACH_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllTags
  = async () => {
  const res = await request.get(urlConfig.TAG_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllMovements
  = async () => {
  const res = await request.get(urlConfig.MOVEMENT_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllCourses
  = async () => {
  const res = await request.get(urlConfig.COURSE_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

export const getAllLives
  = async () => {
  const res = await request.get(urlConfig.LIVE_URL, {params:{size: 1000}})
  if(res.code === '000'){
    return res.data.content;
  }
  message.error(`请求错误:${  res.message}`);
  return false;
}

// export const getAllMembershipGoods
//   = async () => {
//   const res = await request.get(urlConfig.MEMBERSHIP_GOODS_URL, {params:{size: 1000}})
//   if(res.code === '000'){
//     return res.data.content;
//   }
//   message.error(`请求错误:${  res.message}`);
//   return false;
// }

export const url2UploadFileList = (relativePath: string) => {
  if(relativePath){
    return [{
      uid: '-1',
      name: relativePath,
      status: 'done',
      response: {code: '000', data: relativePath},
      url: urlConfig.FILE_DOWNLOAD_URL + relativePath,
    }]
  }
  return [];
}

export const uploadFileList2Url = (fileList: any) => {
  if(fileList && fileList[0] && fileList[0].status ==='done' && fileList[0].response.code === '000'){
    return fileList[0].response.data;
  }
  return null;
}

export const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const formatFileSize = (fileSize:number) => {
  if (fileSize < 1024) {
    return fileSize + 'B';
  } else if (fileSize < (1024*1024)) {
    var temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + 'KB';
  } else if (fileSize < (1024*1024*1024)) {
    var temp = fileSize / (1024*1024);
    temp = temp.toFixed(2);
    return temp + 'MB';
  } else {
    var temp = fileSize / (1024*1024*1024);
    temp = temp.toFixed(2);
    return temp + 'GB';
  }
}

export  const validateMessages = {
  required: "'${label}' 不能为空",
  // ...
};

export const formLayout= {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
