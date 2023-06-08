import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Alert, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, {ProFormCheckbox, ProFormSelect, ProFormText} from '@ant-design/pro-form';
import { connect } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { LoginParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';
import styles from './index.less';
export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;
  const [type, setType] = useState<string>('login');

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    if(type==="login"){
      dispatch({
        type: 'login/login',
        payload: { ...values },
      });
    } else{
      dispatch({
        type: 'login/register',
        payload: { ...values },
      });
    }

  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values as LoginParamsType);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="login"
            tab={"登录"}
          />
          <Tabs.TabPane
              key="register"
              tab={"注册"}
          />

          {/*<Tabs.TabPane*/}
          {/*  key="mobile"*/}
          {/*  tab={intl.formatMessage({*/}
          {/*    id: 'pages.login.phoneLogin.tab',*/}
          {/*    defaultMessage: 'Mobile phone number login',*/}
          {/*  })}*/}
          {/*/>*/}
        </Tabs>

        {status === 'error' && type === "login" && !submitting && (
          <LoginMessage
            content="账号或密码错误!"
          />
        )}
        {/*{type === 'account' && (*/}
        {type === "register" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入用户名'}
              rules={[
                {
                  required: true,
                  message: '用户名是必填项！',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'请输入密码'}
              rules={[
                {
                  required: true,
                  message: '密码是必填项！',
                },
              ]}
            />
            <ProFormSelect
                name="type"
                options={[{label: "卖家", value:"seller"}, {label: "买家", value:"buyer"}]}
                placeholder={'选择用户类型'}
                fieldProps ={{
                  size: 'large',
                }}
            >
            </ProFormSelect>
          </>
        )}

        {type === "login" && (
            <>
              <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'请输入用户名'}
                  rules={[
                    {
                      required: true,
                      message: '用户名是必填项！',
                    },
                  ]}
              />
              <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder={'请输入密码'}
                  rules={[
                    {
                      required: true,
                      message: '密码是必填项！',
                    },
                  ]}
              />
            </>
        )}

        {/*{status === 'error' && loginType === 'mobile' && !submitting && (*/}
        {/*  <LoginMessage content="Verification code error" />*/}
        {/*)}*/}
        {/*{type === 'mobile' && (*/}
        {/*  <>*/}
        {/*    <ProFormText*/}
        {/*      fieldProps={{*/}
        {/*        size: 'large',*/}
        {/*        prefix: <MobileOutlined className={styles.prefixIcon} />,*/}
        {/*      }}*/}
        {/*      name="mobile"*/}
        {/*      placeholder={intl.formatMessage({*/}
        {/*        id: 'pages.login.phoneNumber.placeholder',*/}
        {/*        defaultMessage: 'Phone number',*/}
        {/*      })}*/}
        {/*      rules={[*/}
        {/*        {*/}
        {/*          required: true,*/}
        {/*          message: '手机号是必填项！',*/}
        {/*        },*/}
        {/*        {*/}
        {/*          pattern: /^1\d{10}$/,*/}
        {/*          message: '不合法的手机号！',*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*    <ProFormCaptcha*/}
        {/*      fieldProps={{*/}
        {/*        size: 'large',*/}
        {/*        prefix: <MailOutlined className={styles.prefixIcon} />,*/}
        {/*      }}*/}
        {/*      captchaProps={{*/}
        {/*        size: 'large',*/}
        {/*      }}*/}
        {/*      placeholder={intl.formatMessage({*/}
        {/*        id: 'pages.login.captcha.placeholder',*/}
        {/*        defaultMessage: 'Please enter verification code',*/}
        {/*      })}*/}
        {/*      captchaTextRender={(timing, count) => {*/}
        {/*        if (timing) {*/}
        {/*          return `${count} ${intl.formatMessage({*/}
        {/*            id: 'pages.getCaptchaSecondText',*/}
        {/*            defaultMessage: 'Get verification code',*/}
        {/*          })}`;*/}
        {/*        }*/}

        {/*        return intl.formatMessage({*/}
        {/*          id: 'pages.login.phoneLogin.getVerificationCode',*/}
        {/*          defaultMessage: 'Get verification code',*/}
        {/*        });*/}
        {/*      }}*/}
        {/*      name="captcha"*/}
        {/*      rules={[*/}
        {/*        {*/}
        {/*          required: true,*/}
        {/*          message: '验证码是必填项！',*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*      onGetCaptcha={async (mobile) => {*/}
        {/*        const result = await getFakeCaptcha(mobile);*/}

        {/*        if (result === false) {*/}
        {/*          return;*/}
        {/*        }*/}

        {/*        message.success(*/}
        {/*          'Get the verification code successfully! The verification code is: 1234',*/}
        {/*        );*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*)}*/}
        <div
          style={{
            marginBottom: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码 ?
          </a>
        </div>
      </ProForm>
      {/* <Space className={styles.other}>
        其他登录方式 :
        <AlipayCircleOutlined className={styles.icon} />
        <TaobaoCircleOutlined className={styles.icon} />
        <WeiboCircleOutlined className={styles.icon} />
      </Space> */}
    </div>
  );
}

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
