
import React from 'react'
import * as ArtDesignofReact from 'antd'
import Styles from './loginPage.module.css'
import './loginPage.css'

const Login = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={Styles.LoginPage}>
      <div className={Styles.LoginBox}>
        <div className={Styles.IllustrationWrapper}>
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/>
        </div>
        <ArtDesignofReact.Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className={Styles.FormTitle}>Welcome back</p>
          <p>Login to the Dashboard</p>
          <ArtDesignofReact.Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <ArtDesignofReact.Input
              placeholder="Username"
            />
          </ArtDesignofReact.Form.Item>

          <ArtDesignofReact.Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <ArtDesignofReact.Input.Password 
              placeholder="Password"
            />
          </ArtDesignofReact.Form.Item>

          <ArtDesignofReact.Form.Item name="remember" valuePropName="checked">
            <ArtDesignofReact.Checkbox>Remember me</ArtDesignofReact.Checkbox>
          </ArtDesignofReact.Form.Item>

          <ArtDesignofReact.Form.Item>
            <ArtDesignofReact.Button type="primary" htmlType="submit" className={Styles.LoginFormButton}>
              LOGIN
            </ArtDesignofReact.Button>
          </ArtDesignofReact.Form.Item>
        </ArtDesignofReact.Form>
      </div>
    </div>
  );
};

export default Login