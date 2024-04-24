import React, { useContext, useEffect } from "react";
import InputCustom from "../../components/Input/InputCustom";
import InputPasswordCustom from "../../components/Input/InputPasswordCustom";
import Lottie from "react-lottie";
import * as registerAnimation from "../../assets/animation/register.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import { manageUsersServ } from "../../services/manageUsers";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, saveLocalStorage } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";

const SignIn = () => {
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loadingSlice);

  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: async (values) => {
        // console.log("!!!!");
        try {
          const res = await manageUsersServ.signIn(values);
          saveLocalStorage("user", res);
          notify("Signed in successfully.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          // window.location.href("/");
        } catch (error) {
          notify(error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Please enter username."),
        matKhau: Yup.string().required("Please enter password"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    dispatch(handleLoadingOn());
    const userLocal = getLocalStorage("user");
    if (userLocal) {
      navigate("/");
      dispatch(handleLoadingOff());
    } else {
      dispatch(handleLoadingOff());
    }
  }, []);

  return (
    <div className="h-1/2-screen lg:h-70-screen flex">
      <div className="animation_signIn w-0 md:w-6/12 flex items-center lg:translate-x-20">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <div className="form_signIn w-full md:w-6/12 flex flex-col items-center md:items-start justify-center ml-0 lg:ml-20">
        <div className="p-10 border border-gray-400 rounded-md space-y-5">
          <h1 className="font-bold text-2xl">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputCustom
              placeholder="Enter your username"
              id="taiKhoan"
              label="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.taiKhoan}
              touched={touched.taiKhoan}
              name="taiKhoan"
              value={values.taiKhoan}
              labelClassName="w-1/2"
            />

            <InputPasswordCustom
              placeholder="Enter your password"
              id="matKhau"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
              name="matKhau"
              value={values.matKhau}
              labelClassName="w-1/2"
            />

            <div>
              <button
                type="submit"
                className="bg-black text-white rounded-md py-2 w-full"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
