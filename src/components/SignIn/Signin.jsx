import { Form, message, Button } from "antd";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import "./SignIn.css";

const Signin = () => {
  const dispatch = useDispatch();

  const login = useRef();
  const password = useRef();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const tryAuth = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      login: login.current.value,
      password: password.current.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("http://localhost:3001/login", requestOptions);
    const result = await response.json();
    if (result.login === "failed") {
      message.error("Incorrect login or password");
    } else {
      message.success("Sign-In success. Redirecting..");
      dispatch({
        type: "LOGIN",
        payload: { isLogin: true, username: login.current.value, token: null },
      });
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <div className="center">
        <font size="+3">Sign-In</font>
      </div>
      <br />
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <input type="text" class="ant-input ant-input-lg" ref={login} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <input type="password" class="ant-input ant-input-lg" ref={password} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 12, span: 6 }}>
        <Button type="primary" onClick={() => tryAuth()}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signin;
