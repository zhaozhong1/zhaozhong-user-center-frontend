// @ts-ignore
/* eslint-disable */
import  request  from '../../plugins/globalRequest';




/**
 * @description 获取当前登录用户
 * @METHOD : GET
 * @API /api/user/current
 */
export async function currentUser(options?: { [key: string]: any }) {
  const {data} = await request<API.BaseResponse<API.CurrentUser>>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
  return data;
}

/**
 * @description 退出登录接口
 * @METHOD : POST
 * @API /api/user/outLogin
 */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * @description 登录接口
 * @METHOD : POST
 * @API /api/user/login
 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * @description 注册接口
 * @METHOD : POST
 * @API /api/user/register
 */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * @description 搜索用户接口
 * @METHOD : GET
 * /api/user/search
 */
// body: API.RegisterParams,
export async function searchUsers(searchUser:API.SearchParams,options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: searchUser,
    ...(options || {}),
  });
}

export async function authorized(selectedIdList:number[],options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/authorized', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: selectedIdList,
    ...(options || {}),
  });
}

export async function deleteList(selectedIdList:number[],options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/deleteByIds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: selectedIdList,
    ...(options || {}),
  });
}

/**
 * @description 根据id删除用户
 * @METHOD : DELETE
 * /api/user/delete
 */
export async function deleteUserById(user: API.CurrentUser,options?: { [key: string]: any }){
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/delete/'+user.id,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  })
}

export async function updateUser(user:API.insertParams,options?: { [key: string]: any }){
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/update  ',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    data: user,
    ...(options || {}),
  })
}

export async function insertUser(user:API.insertParams,avatarUrl:string,options?: { [key: string]: any }){
  const data = { ...user, avatarUrl }; // 将 user 和 avatarUrl 合并成一个对象
  return request<API.BaseResponse<API.CurrentUser>>('/api/user/addUser',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    data: data,
    ...(options || {}),
  })
}
export async function uploadAvatar(avatar:File,options?: { [key: string]: any }){
  return request<API.BaseResponse<string>>('/api/upload/avatar',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    data: avatar,
    ...(options || {}),
  })
}


/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
