import { Layout, Menu, Space } from "antd";
import "./LayoutPage.css";
import "antd/dist/antd.css";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import Signin from "../SignIn/Signin";
import Contacts from "../Contacts/Contacts";

const LayoutPage = (props) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state);
  const { isLogin } = useSelector((state) => state);
  const { Header, Footer, Content } = Layout;
  return (
    <>
      <Layout className="layout">
        <Header>
          <Space>
            <font color="white">
              <UserOutlined /> <span> </span>
              {username}
            </font>
            <div> </div>
            <div> </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
              {isLogin ? (
                <>
                  <Menu.Item key={1}>Contacts</Menu.Item>
                  <Menu.Item key={3}>
                    <a onClick={() => dispatch({ type: "LOGOUT" })}>Logout</a>
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item key={1}>
                  <KeyOutlined />
                  <span>Sign-In</span>
                </Menu.Item>
              )}
            </Menu>
          </Space>
        </Header>
        <br />
        <br />
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            {props.page === "signin" ? <Signin /> : null}
            {props.page === "contacts" ? <Contacts /> : null}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ContactsBook ©2022 Created by Cherednychenko Alexandr
        </Footer>
      </Layout>
    </>
  );
};

export default LayoutPage;
