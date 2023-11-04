import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import {
  LockOutlined,

  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, history, SelectLang, useIntl, Helmet } from '@umijs/max';
import {LOGIN_LINK, REGISTER_LINK, SYSTEM_LOGO} from "@/constants";
import { Alert, message, Tabs } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useState } from 'react';
import {values} from "lodash";


const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const RegisterMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

// const {userAccount,userPassword,checkPassword} = API.RegisterParam;

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();



  const handleSubmit = async (values: API.RegisterParams) => {



    const {userAccount,userPassword,checkPassword} = values;
    //前端校验
    if(userPassword !== checkPassword){
      message.error('两次输入的密码不一致。');
      return ;
    }

    try {
      // 注册
      const result = await register({ ...values, type });
      if (result.data>0) {
        const defaultRegisterSuccessMessage = intl.formatMessage({
          id: 'pages.register.success',
          defaultMessage: '注册成功！',
        });
        message.success(defaultRegisterSuccessMessage);

        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }

      // 如果失败去设置用户错误信息
      throw new Error(`register error id = ${result.data}`);

    } catch (error) {
      const defaultRegisterFailureMessage = intl.formatMessage({
        id: 'pages.register.failure',
        defaultMessage: '注册失败，请重试！',
      });
      console.log(error);
      message.error(defaultRegisterFailureMessage);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.register',
            defaultMessage: '注册页',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter={
            {
              searchConfig: {
                submitText: '注册',
              }
            }
          }
          logo={<img alt="logo" src={SYSTEM_LOGO} />}
          title="兆中用户中心"
          subTitle={
            <>
              <a href={LOGIN_LINK} target={"_parent"} rel={"noreferrer"} style={{color:"blue",textDecoration:"none"}}>
                返回登录
              </a>
            </>
          }
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({
                  id: 'pages.register.accountRegister.tab',
                  defaultMessage: '账户密码注册',
                }),
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="planetCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl. formatMessage({
                  id: 'pages.register.planetCode.placeholder',
                  defaultMessage: '输入星球码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.planetCode.required"
                        defaultMessage="请输入星球码!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl. formatMessage({
                  id: 'pages.register.userAccount.placeholder',
                  defaultMessage: '输入注册账号',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.userAccount.required"
                        defaultMessage="请输入账号!"
                      />
                    ),
                  },
                  {
                    required: false,
                    min: 4,
                    message:(
                      <FormattedMessage
                        id="pages.register.userAccount.notReachMin"
                        defaultMessage="账号长度不可小于4位！"
                      />
                    )
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.password.placeholder',
                  defaultMessage: '输入注册密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.register.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                  {
                    required: false,
                    min: 8,
                    message:(
                      <FormattedMessage
                        id="pages.register.length.notReachMin"
                        defaultMessage="密码长度不可小于8位！"
                      />
                    )
                  },
                ]}
              />
              <ProFormText.Password
                  name="checkPassword"
                  fieldProps={{
                      size: 'large',
                      prefix: <LockOutlined />,
                  }}
                  placeholder={intl.formatMessage({
                      id: 'pages.register.checkPassword.placeholder',
                      defaultMessage: '确认密码',
                  })}
                  rules={[
                      {
                          required: true,
                          message: (
                              <FormattedMessage
                                  id="pages.register.password.required"
                                  defaultMessage="请确认密码！"
                              />
                          ),
                      },
                      {
                          required: false,
                          min: 8,
                          message:(
                              <FormattedMessage
                                  id="pages.register.length.notReachMin"
                                  defaultMessage="密码长度不可小于8位！"
                              />
                          )
                      }

                  ]}
              />
            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
