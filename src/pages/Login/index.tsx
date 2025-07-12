import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Typography, Divider } from 'antd';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { login, getUserInfo } from '@/apis/common';
import { Token, UserInfo } from '@/constant/common';
import SimpleVerify from '@/components/SimpleVerify';
// import logo from '@/assets/img/logo_512.png';

export default function Login() {
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const simpleVerifyFef = useRef<any>();

  const onFinish = async (values: any) => {
    if (!success) {
      message.warning('请滑动图形进行验证!');
      return;
    }
    // 跳到主页
    setBtnLoading(true);
    login({
      account: values.account,
      password: window.btoa(values.password)
    }).then(async (res: any) => {
      setBtnLoading(false);
      if (res.success) {
        message.success('登陆成功');
        window.sessionStorage.setItem(Token, res.data);

        const userInfo = await getUserInfo();
        window.sessionStorage.setItem(UserInfo, JSON.stringify(userInfo.data));

        // 跳到主页
        navigate('/', { replace: true });
      } else {
        simpleVerifyFef.current?.reset();
        setSuccess(false);
      }
    });
  };

  return (
    <div className={styles.loginContent}>
      <div className={styles.loginBoxWarp}>
        <div className={styles.loginBox}>
          <div className="justify-content-center mb-24" style={{ alignItems: 'center' }}>
            {/* <img style={{ height: 80 }} src={logo} alt="logo" /> */}
            <Divider type="vertical" />
            <Typography.Text style={{ fontSize: 20 }}>管理后台</Typography.Text>
          </div>
          <Form
            size="large"
            onFinish={onFinish}
            onFinishFailed={() => {
              simpleVerifyFef.current?.reset();
              setSuccess(false);
            }}
          >
            <Form.Item name="account" rules={[{ required: true, message: '请输入登录账号!' }]}>
              <Input prefix={<UserOutlined />} allowClear placeholder="登陆账号" maxLength={32} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
              <Input.Password
                prefix={<LockOutlined />}
                allowClear
                maxLength={32}
                type="loginPassword"
                placeholder="登陆密码"
              />
            </Form.Item>
            <Form.Item>
              <SimpleVerify ref={simpleVerifyFef} width={355} success={() => setSuccess(true)} />
            </Form.Item>
            <Form.Item>
              <Button block disabled={btnLoading} loading={btnLoading} type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
