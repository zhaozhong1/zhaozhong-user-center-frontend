/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {extend} from 'umi-request';
import {message} from 'antd';
import {history} from '@umijs/max';
import {stringify} from "querystring";

const request = extend({
  credentials:'include',
  prefix:process.env.NODE_ENV === 'production'?'http://120.25.164.74:16060':undefined,
})

  /**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {

  const res = await response.clone().json();
  // console.log(data)
  if(res.code === 0) {
    return response;
  }
  if (res.code === 40100){//未登录
    message.error("请先登录。");
    history.replace({
      pathname:"/user/login",
      search: stringify({
        redirect: location.pathname,
      }),
    });
  }
  return response;
});

export default request;
