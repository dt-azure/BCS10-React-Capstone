import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import InputCustom from "../../components/Input/InputCustom";
import { DatePicker, Rate } from "antd";
import SwitchCustom from "../../components/Input/SwitchCustom";
import { useFormik } from "formik";
import { useOutletContext, useParams } from "react-router-dom";
import * as Yup from "yup";
import "./addMovie.scss";
import { CloseCircleOutlined } from "@ant-design/icons";
import { manageMoviesServ } from "../../services/manageMovies";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEnableSubmitBtn,
  handleEnableUpdateBtn,
  handleSelectMovie,
} from "../../redux/slice/movieAdminSlice";
import dayjs from "dayjs";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";


const AddMovie = () => {
  const currentDate = new Date();
  // let dateRef = `${currentDate.getDay()}-${
  //   currentDate.getMonth() + 1
  // }-${currentDate.getFullYear()}`;

  const [dateStatus, setDateStatus] = useState("none");
  const [poster, setPoster] = useState();

  const inputRef = useRef(null);
  const dateRef = useRef(null);

  const { submit, update, selectedMovie } = useSelector(
    (state) => state.movieAdminSlice
  );
  const dispatch = useDispatch();

  const [menuKey, setMenuKey] = useOutletContext();

  let defaultDate = selectedMovie.ngayKhoiChieu ? dayjs(selectedMovie.ngayKhoiChieu) : dayjs()


  const notify = useContext(NotifyContext);

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setFieldValue,
    setValues,
    setFieldError,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: true,
      dangChieu: false,
      hot: true,
      danhGia: 0,
    },
    onSubmit: async (values) => {
      try {
        // console.log(values);
        let formData = new FormData();

        for (let key in values) {
          if (key == "hinhAnh") {
            formData.append("File", values[key]);
          } else {
            formData.append(key, values[key]);
          }
        }

        if (update) {
          await manageMoviesServ.updateMovie(formData);
          notify("Movie updated successfully.");
        } else {
          await manageMoviesServ.uploadMovie(formData);
          resetForm();
          setPoster("");
          inputRef.current.value = null;
          notify("Movie added successfully.");
        }
      } catch (error) {
        notify(error);
      }
    },
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Field is required."),
      trailer: Yup.string()
        .required("Field is required.")
        .url("Invalid URL.")
        .matches(/.+(youtube.com).+/, "Invalid YouTube URL."),
      moTa: Yup.string().required("Field is required."),
      ngayKhoiChieu: Yup.string().required("Field is required."),
    }),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuKey(["1"])
    if (update) {
      setValues(selectedMovie);
      setPoster(selectedMovie.hinhAnh);
      dispatch(handleEnableUpdateBtn());
    }

    return () => {
      dispatch(handleSelectMovie({}));
      dispatch(handleEnableSubmitBtn());
    };
  }, []);

  return (
    <div className="px-0 lg:px-10 py-3">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputCustom
          name="tenPhim"
          labelClassName={`w-1/2 md:w-1/4 text-right pr-3 md:pr-5 ${
            errors.tenPhim ? "pt-2" : null
          }`}
          value={values.tenPhim}
          onChange={handleChange}
          label="Movie Name"
          placeholder="Enter Movie Name"
          onBlur={handleBlur}
          touched={touched.tenPhim}
          error={errors.tenPhim}
        />
        <InputCustom
          name="trailer"
          labelClassName={`w-1/2 md:w-1/4 text-right pr-5 ${
            errors.trailer ? "pt-2" : null
          }`}
          value={values.trailer}
          onChange={handleChange}
          label="Trailer"
          placeholder="Enter Trailer URL"
          onBlur={handleBlur}
          touched={touched.trailer}
          error={errors.trailer}
        />
        <InputCustom
          name="moTa"
          labelClassName={`w-1/2 md:w-1/4 text-right pr-5 ${
            errors.moTa ? "pt-2" : null
          }`}
          value={values.moTa}
          onChange={handleChange}
          label="Movie Description"
          placeholder="Enter Movie Description"
          onBlur={handleBlur}
          touched={touched.moTa}
          error={errors.moTa}
        />
        <div className="flex items-center">
          <label className="text-right pr-5 w-1/2 md:w-1/4 font-bold" htmlFor="">
            Enter First Screening Date
          </label>
          <div className="w-full">
            <DatePicker
              name="ngayKhoiChieu"
              status={dateStatus}
              onChange={(datejs, dateString) => {
                if (datejs <= currentDate) {
                  setFieldValue("ngayKhoiChieu", null);
                  setDateStatus("error");
                  
                } else {
                  setFieldValue("ngayKhoiChieu", dateString);
                  setDateStatus("none");
                }
                
              }}
              format="DD-MM-YYYY"
              error={errors.ngayKhoiChieu}
              defaultValue={defaultDate}
              // value={
              //   values.ngayKhoiChieu !== ""
              //     ? 
              //     : null
              // }
            />
            {dateStatus == "error" ? (
              <p className="text-red-500 text-sm mt-3">
                Cannot select a date from the past.
              </p>
            ) : null}
            {dateStatus == "none" &&
            errors.ngayKhoiChieu &&
            touched.ngayKhoiChieu ? (
              <p className="text-red-500 text-sm mt-3">
                {errors.ngayKhoiChieu}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex items-center">
          <label className="w-1/2 md:w-1/4 text-right pr-5 font-bold" htmlFor="">
            Movie Status
          </label>
          <div className="w-full flex flex-col md:flex-row items-center justify-start">
            <SwitchCustom
              label="Is Showing:"
              name="dangChieu"
              value={values.dangChieu}
              setFieldValue={setFieldValue}
              className="mr-5"
            />
            <SwitchCustom
              label="Coming Soon:"
              name="sapChieu"
              value={values.sapChieu}
              defaultCheck={false}
              // switchOff="switch-off"
              setFieldValue={setFieldValue}
            />
            <SwitchCustom
              label="Hot:"
              name="hot"
              value={values.hot}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="text-right pr-5 w-1/2 md:w-1/4 font-bold" htmlFor="">
            Rating
          </label>
          <div className="w-full">
            <Rate
              name="danhGia"
              allowHalf
              defaultValue={0}
              onChange={(value) => {
                console.log(value);
                setFieldValue("danhGia", value * 2);
              }}
              value={values.danhGia / 2}
            />
          </div>
        </div>
        <div className="flex poster-input">
          <label className="text-right pr-5 w-1/2 md:w-1/4 font-bold" htmlFor="">
            Poster
          </label>
          <div className="w-full flex">
            <div className="w-full md:w-1/3">
              <div className="flex items-center">
                <input
                  type="file"
                  onChange={(e) => {
                    let posterURL = URL.createObjectURL(e.target.files[0]);
                    setFieldValue("hinhAnh", e.target.files[0]);
                    setPoster(posterURL);
                  }}
                  ref={inputRef}
                />
              </div>
            </div>
          </div>
        </div>
        {poster ? (
          <div className="poster-frame p-3 bg-gray-200 rounded-md w-4/5 md:w-1/3 flex justify-between items-center">
            <div className="flex items-center truncate overflow-hidden...">
              <img src={poster} className="poster mr-3" alt="" />
              {inputRef.current.value == "" ? (
                <p>Please re-upload the poster.</p>
              ) : (
                <p>{inputRef.current.value.replace(/.*[\/\\]/, "")}</p>
              )}
            </div>
            <CloseCircleOutlined
              className="close-btn ml-5"
              onClick={() => {
                inputRef.current.value = null;
                setPoster("");
              }}
            />
          </div>
        ) : null}
        <div className="btn-field flex flex-col md:flex-row w-1/2 md:w-full gap-3">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded disabled:opacity-20"
            disabled={!submit}
          >
            Submit
          </button>
          <button
            className="bg-red-600 text-white px-5 py-2 rounded"
            onClick={() => {
              resetForm();
              inputRef.current.value = null;
              setPoster("");
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

export default AddMovie;
