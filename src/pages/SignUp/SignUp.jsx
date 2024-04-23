import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import Lottie from "react-lottie";
import * as registerAnimation from "../../assets/animation/register.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import { manageUsersServ } from "../../services/manageUsers";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, saveLocalStorage } from "../../utils/util";
import InputPasswordCustom from "../../components/Input/InputPasswordCustom";
import { useDispatch, useSelector } from "react-redux";
import { handleEnableSubmitBtn } from "../../redux/slice/userAdminSlice";

const SignUp = () => {
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const { submit, update } = useSelector((state) => state.userAdminSlice);
  const dispatch = useDispatch();
  const userLocal = getLocalStorage("user");

  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    onSubmit: async (values) => {
      if (submit) {
        manageUsersServ
          .signUp({ ...values, maNhom: "GP01" })
          .then(async (res) => {
            notify("Sign up successfully.");
            const userData = await manageUsersServ.signIn(values);
            saveLocalStorage("user", userData);
          })
          .catch((err) => {
            notify(err.response.data.content);
          });
        navigate("/");
      } else {
        console.log(values)
        manageUsersServ
          .updateUser({
            ...values,
            maNhom: "GP01",
            maLoaiNguoiDung: userLocal.data.content.maLoaiNguoiDung,
          })
          .then(async (res) => {
            try {
              const userRes = await manageUsersServ.signIn(values);
              saveLocalStorage("user", userRes);
              navigate("/account");
              notify("User info updated successfully.");
            } catch (error) {
              notify("An error has occured.");
              
            }
          })
          .catch((err) => {
            notify(err.response.data.content);
          });
      }
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string()
        .required("Field is required.")
        .matches(/^[\w\d]{6,16}$/, "Invalid username."),
      hoTen: Yup.string()
        .required("Field is required.")
        .matches(/^[a-zA-Z ]+$/, "Invalid name."),
      email: Yup.string()
        .required("Field is required.")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email."
        ),
      soDt: Yup.string()
        .required("Field is required.")
        .matches(/^[0-9]{8,10}$/, "Invalid phone number."),
      matKhau: Yup.string()
        .required("Field is required.")
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and have at least 8 characters."
        ),
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
    if (userLocal && submit) {
      navigate("/");
    }

    if (update) {
      let user = userLocal.data.content;
      setValues({
        taiKhoan: user.taiKhoan,
        matKhau: "",
        email: user.email,
        soDt: user.soDT,
        hoTen: user.hoTen,
      });
    }

    let windowWidth = window.innerWidth;
    if (windowWidth < 1024) {
      setDimensions({ width: 300, height: 300 });
    }

    return () => {
      dispatch(handleEnableSubmitBtn());
    };
  }, []);

  return (
    <div className="h-1/2 flex">
      <div className="animation_signIn w-0 md:w-1/3 lg:w-5/12 flex items-center md:translate-x-10 lg:translate-x-20">
        <Lottie
          options={defaultOptions}
          height={dimensions.height}
          width={dimensions.width}
        />
      </div>
      <div className="form_signIn w-full md:w-2/3 lg:w-7/12 flex md:flex-col items-center md:items-start justify-center ml-0 md:ml-20 px-8 lg:px-0">
        <div className="mt-10 lg:mt-0 p-4 md:p-10 border border-gray-400 rounded-md space-y-5 w-full lg:w-2/3">
          <h1 className="font-bold text-2xl">Sign Up</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputCustom
              labelClassName="w-1/2 "
              placeholder="Enter your username"
              id="taiKhoan"
              label="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.taiKhoan}
              touched={touched.taiKhoan}
              name="taiKhoan"
              value={values.taiKhoan}
              disabled = {update ? true : false}
            />

            {/* <InputCustom
              labelClassName="w-1/2 "
              type="password"
              placeholder="Enter your password"
              id="matKhau"
              label="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
              name="matKhau"
              value={values.matKhau}
            /> */}

            <InputPasswordCustom
              placeholder="Enter your password"
              id="matKhau"
              label="Password"
              labelClassName="w-1/2"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
              name="matKhau"
              value={values.matKhau}
            />

            <InputCustom
              labelClassName="w-1/2 "
              placeholder="Enter your full name"
              id="hoTen"
              label="Full Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.hoTen}
              touched={touched.hoTen}
              name="hoTen"
              value={values.hoTen}
            />

            <InputCustom
              labelClassName="w-1/2 "
              placeholder="Enter your email"
              id="email"
              label="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              name="email"
              value={values.email}
            />

            <InputCustom
              labelClassName="w-1/2 "
              placeholder="Enter your phone number"
              id="soDt"
              label="Phone Number"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.soDt}
              touched={touched.soDt}
              name="soDt"
              value={values.soDt}
            />

            <div>
              {submit ? (
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-2 w-full"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-2 w-full"
                >
                  Update
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
