import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import InputCustom from "../../components/Input/InputCustom";
import { manageUsersServ } from "../../services/manageUsers";
import SelectCustom from "../../components/Input/SelectCustom";
import InputPasswordCustom from "../../components/Input/InputPasswordCustom";
import "./addUser.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEnableSubmitBtn,
  handleSelectUser,
} from "../../redux/slice/userAdminSlice";
import { useOutletContext } from "react-router-dom";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";

const AddUser = () => {
  const [accountTypeList, setAccountTypeList] = useState([]);
  const { submit, update, selectedUser } = useSelector(
    (state) => state.userAdminSlice
  );
  const dispatch = useDispatch();
  const [menuKey, setMenuKey] = useOutletContext();
  const notify = useContext(NotifyContext);

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    resetForm,
    setValues,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDT: "",
      matKhau: "",
      maLoaiNguoiDung: "",
    },
    onSubmit: async (values) => {
      if (update) {
        try {
          await manageUsersServ.updateUser({ ...values, maNhom: "GP01" });
          notify("User updated successfully.");
        } catch (error) {
          notify("Error occurred.");
        }
      } else {
        try {
          await manageUsersServ.addUser({ ...values, maNhom: "GP01" });
          notify("User added successfully.");
          resetForm();
        } catch (error) {
          notify("Error occurred.");
        }
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
      soDT: Yup.string()
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

  useEffect(() => {
    setMenuKey(["4"])
    let newAccountTypeList = [];
    const getAccountTypes = async () => {
      const res = await manageUsersServ.getAllUserTypes();
      res.data.content.forEach((item) => {
        newAccountTypeList.push({
          value: item.maLoaiNguoiDung,
          label: item.tenLoai,
        });
      });
      setAccountTypeList(newAccountTypeList);
    };

    getAccountTypes();
    if (update) {
      setValues(selectedUser);
    }

    return () => {
      dispatch(handleSelectUser({}));
      dispatch(handleEnableSubmitBtn());
    };
  }, []);

  return (
    <div className="px-10 py-3">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputCustom
          name="taiKhoan"
          value={values.taiKhoan}
          onChange={handleChange}
          label="Username"
          placeholder="Enter username"
          onBlur={handleBlur}
          touched={touched.taiKhoan}
          error={errors.taiKhoan}
          labelClassName="w-1/4 text-right pr-5"
        />
        <InputCustom
          name="hoTen"
          value={values.hoTen}
          onChange={handleChange}
          label="Full Name"
          placeholder="Enter full name"
          onBlur={handleBlur}
          touched={touched.hoTen}
          error={errors.hoTen}
          labelClassName="w-1/4 text-right pr-5"
        />
        <InputCustom
          name="email"
          value={values.email}
          onChange={handleChange}
          label="Email"
          placeholder="Enter email"
          onBlur={handleBlur}
          touched={touched.email}
          error={errors.email}
          labelClassName="w-1/4 text-right pr-5"
        />
        <InputCustom
          name="soDT"
          value={values.soDT}
          onChange={handleChange}
          label="Phone number"
          placeholder="Enter phone number"
          onBlur={handleBlur}
          touched={touched.soDT}
          error={errors.soDT}
          labelClassName="w-1/4 text-right pr-5"
        />
        <InputPasswordCustom
          name="matKhau"
          value={values.matKhau}
          onChange={handleChange}
          label="Password"
          placeholder="Enter password "
          onBlur={handleBlur}
          touched={touched.matKhau}
          error={errors.matKhau}
        />
        <SelectCustom
          name="maLoaiNguoiDung"
          label="Account Type"
          options={accountTypeList}
          onChange={handleChange}
          touched={touched.maLoaiNguoiDung}
          onBlur={handleBlur}
          error={errors.maLoaiNguoiDung}
          value={update ? selectedUser.maLoaiNguoiDung : "Choose account type"}
          setFieldValue={setFieldValue}
        />
        <div className="btn-field-user flex gap-3">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded disabled:opacity-20"
            disabled={!submit}
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-5 py-2 rounded"
            onClick={() => {
              resetForm();
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded disabled:opacity-20"
            disabled={!update}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
