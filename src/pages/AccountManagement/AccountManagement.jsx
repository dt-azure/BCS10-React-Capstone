import React, { createContext, useEffect, useState } from "react";
import { Layout, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../layout/Header/Header";
import { getLocalStorage } from "../../utils/util";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import Footer from "../../layout/Footer/Footer";
import "./accountManagement.scss";

export const UserContext = createContext(null);

const AccountManagement = () => {
  const userDetails = getLocalStorage("user");
  const dispatch = useDispatch();
  const { isLoading, isCount } = useSelector((state) => state.loadingSlice);
  const renderNotify = (notify) => {
    return toast(notify);
  };

  const [activeTab, setActiveTab] = useState("");

  const navigate = useNavigate();

  const onChange = (key) => {
    navigate(key);
  };
  const items = [
    {
      key: "/account",
      label: "Account Details",
    },
    {
      key: "/account/booking",
      label: "Booking Info",
    },
  ];

  useEffect(() => {
    if (!userDetails) {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Layout id="account-page">
        <Header>Header</Header>
        <div className="container p-5 flex justify-center">
          <Tabs
            type="card"
            defaultActiveKey={
              window.location.href.includes("booking")
                ? "/account/booking"
                : "/account"
            }
            items={items}
            onChange={onChange}
          />
        </div>
        <div className="account-page-body">
          <UserContext.Provider
            value={{
              userDetails: userDetails.data.content,
              activeTabContext: [activeTab, setActiveTab],
            }}
          >
            <NotifyContext.Provider value={renderNotify}>
              <Outlet />
              <ToastContainer />
            </NotifyContext.Provider>
          </UserContext.Provider>
        </div>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default AccountManagement;
