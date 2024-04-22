import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  PlusCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { getLocalStorage } from "../../utils/util";
import { NotifyContext } from "../UserTemplate/UserTemplate";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";

const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuKey, setMenuKey] = useState(["1"]);
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderNotify = (notify) => {
    return toast(notify);
  };

  const dispatch = useDispatch();

  const adminSiderItems = [
    {
      key: "5",
      icon: <HomeOutlined />,
      label: (
        <NavLink
          to="/"
          onClick={() => {
            setMenuKey(["5"]);
          }}
        >
          Home
        </NavLink>
      ),
    },
    {
      // key: "2",
      icon: <VideoCameraOutlined />,
      label: "Manage Movies",
      children: [
        {
          key: "2",
          icon: <VideoCameraOutlined />,
          label: (
            <NavLink
              to="/admin/movie-management"
              onClick={() => {
                setMenuKey(["2"]);
              }}
            >
              Movie List
            </NavLink>
          ),
        },
        {
          key: "1",
          icon: <PlusCircleOutlined />,
          label: (
            <NavLink
              to="/admin/add-movie"
              onClick={() => {
                setMenuKey(["1"]);
              }}
            >
              Add Movie
            </NavLink>
          ),
        },
      ],
    },
    {
      // key: "3",
      icon: <UploadOutlined />,
      label: "Manage Users",
      children: [
        {
          key: "3",
          icon: <VideoCameraOutlined />,
          label: (
            <NavLink
              to="/admin/user-management"
              onClick={() => {
                setMenuKey(["3"]);
              }}
            >
              User List
            </NavLink>
          ),
        },
        {
          key: "4",
          icon: <PlusCircleOutlined />,
          label: (
            <NavLink
              to="/admin/add-user"
              onClick={() => {
                setMenuKey(["4"]);
              }}
            >
              Add User
            </NavLink>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(handleLoadingOn());
    const user = getLocalStorage("user");

    if (!user) {
      window.location.href = "/";
    }
    if (user?.data.content.maLoaiNguoiDung !== "QuanTri") {
      window.location.href = "/";
    } else {
      dispatch(handleLoadingOff());
    }
  }, []);

  return (
    <NotifyContext.Provider value={renderNotify}>
      {isLoading ? <Loading /> : null}
      <Layout className="min-h-screen">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={menuKey}
            // defaultSelectedKeys={menuKey}
            // openKeys={menuKey}
            selectedKeys={menuKey}
            items={adminSiderItems}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet context={[menuKey, setMenuKey]} />
          </Content>
        </Layout>
      </Layout>
      <ToastContainer />
    </NotifyContext.Provider>
  );
};

export default AdminTemplate;
