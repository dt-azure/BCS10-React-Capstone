import React, { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import SeatLayout from "../../components/SeatLayout/SeatLayout";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const Ticket = () => {
  const dispatch = useDispatch();
  const renderNotify = (notify) => {
    return toast(notify);
  };

  const { isLoading, isCount } = useSelector((state) => state.loadingSlice);

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(handleLoadingOn());
    dispatch(handleLoadingOff());
  }, []);

  return (
    <NotifyContext.Provider value={renderNotify}>
      <Layout>
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Outlet />
            <Footer />
          </>
        )}
      </Layout>
      <ToastContainer />
    </NotifyContext.Provider>
  );
};

export default Ticket;
