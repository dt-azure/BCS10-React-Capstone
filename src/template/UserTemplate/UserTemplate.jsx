import React, { createContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";
import { useSelector, useDispatch } from "react-redux";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

export const NotifyContext = createContext(null);

const UserTemplate = ({ children }) => {
  const { isLoading } = useSelector((state) => state.loadingSlice);
  const dispatch = useDispatch();
  const renderNotify = (notify) => {
    return toast(notify);
  };

  useEffect(() => {
    dispatch(handleLoadingOn());
    dispatch(handleLoadingOff());
  }, []);

  return (
    <NotifyContext.Provider value={renderNotify}>
      <Header />
      {isLoading ? <Loading /> : null}
      <Outlet />
      <ToastContainer />
      <Footer />
    </NotifyContext.Provider>
  );
};

export default UserTemplate;
