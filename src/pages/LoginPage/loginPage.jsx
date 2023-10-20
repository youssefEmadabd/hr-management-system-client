import React from 'react'
import * as ArtDesignofReact from 'antd'
import { connect } from 'react-redux'
import AuthActions from 'Stores/Auth/Actions'
import AuthSelectors from 'Stores/Auth/Selectors'
import Styles from './loginPage.module.css'
import './loginPage.css'
import { Spinner } from 'Components'

const Login = ({ isLoginLoading, login }) => {
  const onFinish = (values) => {
    console.log('test:', values.target[0].value, values.target[1].value)
    login(values.target[0].value, values.target[1].value)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return ( isLoginLoading?<Spinner/>:
    <div className={Styles.LoginPage}>
      <div className={Styles.LoginBox}>
        <div className={Styles.IllustrationWrapper}>
          <img
            src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700"
            alt="Login"
          />
        </div>
        <ArtDesignofReact.Form
          name="login-form"
          initialValues={{ remember: true }}
          onSubmitCapture={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className={Styles.FormTitle}>Welcome back</p>
          <p>Login to Employees' Dashboard</p>
          <ArtDesignofReact.Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <ArtDesignofReact.Input placeholder="Username" />
          </ArtDesignofReact.Form.Item>

          <ArtDesignofReact.Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <ArtDesignofReact.Input.Password placeholder="Password" />
          </ArtDesignofReact.Form.Item>

          <ArtDesignofReact.Form.Item>
            <ArtDesignofReact.Button
              type="primary"
              htmlType="submit"
              className={Styles.LoginFormButton}
            >
              LOGIN
            </ArtDesignofReact.Button>
          </ArtDesignofReact.Form.Item>
        </ArtDesignofReact.Form>
      </div>
    </div>
  )
}
function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(AuthActions.login(username, password)),
  }
}

const mapStateToProps = (state) => ({
  isLoginLoading: AuthSelectors.isLoginLoading(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

