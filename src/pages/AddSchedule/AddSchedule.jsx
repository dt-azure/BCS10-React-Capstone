import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { manageCinemaServ } from "../../services/manageCinema";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import * as Yup from "yup";
import { Select, DatePicker, Input, Spin } from "antd";
import dayjs from "dayjs";
import { manageScheduleServ } from "../../services/manageSchedule";

const AddSchedule = () => {
  const { selectedMovie } = useSelector((state) => state.movieAdminSlice);
  const [cinemaList, setCinemaList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const notify = useContext(NotifyContext);
  const [locationOptions, setLocationOptions] = useState([]);
  const [showroom, setShowroom] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState();
  const [selectedShowroom, setSelectedShowroom] = useState();
  const [dateStatus, setDateStatus] = useState("none");
  const currentDate = new Date();
  const [fetching, setFetching] = useState(false);

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
      maPhim: 0,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    validationSchema: Yup.object({
      ngayChieuGioChieu: Yup.string().required("Field is required."),
      maRap: Yup.string().required("Field is required"),
      giaVe: Yup.number()
        .required("Field is required.")
        .min(75000, "Price cannot be lower than 75,000.")
        .max(200000, "Price cannot be higher than 200,000."),
    }),
  });

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const handleGetLocationList = async (cinema) => {
    setFetching(true);
    const res = await manageCinemaServ.getLocationInfo(cinema);
    setLocationList(res.data.content);
    setFetching(false);
  };

  const handleGetShowroomList = (cinema) => {
    setFetching(true);
    let selectedCinema = locationList.filter((item) => item.maCumRap == cinema);
    let newShowroomOptions = selectedCinema[0].danhSachRap.map((item) => ({
      value: item.maRap,
      label: item.tenRap,
    }));
    setShowroom(newShowroomOptions);
    setFetching(false);
  };

  useEffect(() => {
    manageCinemaServ
      .getCinemaGroupInfo()
      .then((res) => {
        let cinemaOptions = [];
        res.data.content.forEach((item) => {
          cinemaOptions.push({
            value: item.maHeThongRap,
            label: item.tenHeThongRap,
          });
        });

        setCinemaList(cinemaOptions);
      })
      .catch((err) => {
        notify(err);
      });

    setFieldValue("maPhim", parseInt(selectedMovie.maPhim));
  }, []);

  useEffect(() => {
    let newLocationOptions = locationList.map((item) => ({
      value: item.maCumRap,
      label: item.tenCumRap,
    }));
    setLocationOptions(newLocationOptions);
  }, [locationList]);

  return (
    <div className="px-0 lg:px-10 py-3 flex">
      <div className="w-0 md:w-4/12 flex justify-center mr-0 md:mr-4 lg:mr-0">
        <img src={selectedMovie.hinhAnh} className="w-0 md:w-60" alt="" />
      </div>
      <div className="w-full md:w-8/12 space-y-5">
        <p className="font-bold text-2xl">Add Schedule</p>
        <div className="flex items-center text-lg">
          <p className="w-1/2 md:w-2/5 lg:w-1/5">Movie name:</p>
          <p className="w-1/2 md:w-3/5 lg:w-4/5 font-bold">{selectedMovie.tenPhim}</p>
        </div>

        <div className="flex items-center text-lg">
          <p className="w-1/2 md:w-2/5 lg:w-1/5">Cinema Chain:</p>
          <Select
            defaultValue="Select Cinema Chain"
            style={{
              width: "50%",
            }}
            options={cinemaList}
            onSelect={(value) => {
              setSelectedCinema("Select Cinema");
              setSelectedShowroom("Select Showroom");
              setShowroom([]);
              handleGetLocationList(value);
            }}
          />
        </div>

        <div className="flex items-center text-lg">
          <p className="w-1/2 md:w-2/5 lg:w-1/5">Cinema:</p>
          <Select
            defaultValue="Select Cinema"
            value={selectedCinema}
            style={{
              width: "50%",
            }}
            options={locationOptions}
            onSelect={(value) => {
              setSelectedCinema(value);
              // handleGetShowroomList(value);
              setFieldValue("maRap", value);
            }}
            notFoundContent={fetching ? <Spin size="small" /> : null}
          />
        </div>

        {/* <div className="flex items-center text-lg">
          <p className="w-1/5">Showroom:</p>
          <div className="w-4/5">
            <Select
              defaultValue="Select Showroom"
              value={selectedShowroom}
              style={{
                width: "50%",
              }}
              options={showroom}
              onSelect={(value) => {
                setSelectedShowroom(value);
                setFieldValue("maRap", value);
              }}
              notFoundContent={fetching ? <Spin size="small" /> : null}
            />
            {errors.maRap && touched.maRap ? (
              <p className="text-red-500 text-sm mt-3">{errors.maRap}</p>
            ) : null}
          </div>
        </div> */}

        <div className="flex items-start text-lg">
          <p className="w-1/2 md:w-2/5 lg:w-1/5">Time:</p>
          <div>
            <DatePicker
              showTime={{
                format: "HH:mm",
              }}
              name="ngayChieuGioChieu"
              status={dateStatus}
              onChange={(value, dateString) => {
                if (value < currentDate) {
                  setFieldValue("ngayChieuGioChieu", null);
                  setDateStatus("error");
                } else {
                  setFieldValue("ngayChieuGioChieu", dateString);
                  setDateStatus("none");
                }
                console.log(errors);
                console.log(touched);
              }}
              onOk={onOk}
              format="DD-MM-YYYY HH:mm:ss"
              error={errors.ngayChieuGioChieu}
              //   value={
              //     values.ngayChieuGioChieu !== ""
              //       ? dayjs(Date(values.ngayChieuGioChieu))
              //       : null
              //   }
            />
            {dateStatus == "error" ? (
              <p className="text-red-500 text-sm mt-3">
                Cannot select a date from the past.
              </p>
            ) : null}
            {dateStatus == "none" &&
            errors.ngayChieuGioChieu &&
            touched.ngayChieuGioChieu ? (
              <p className="text-red-500 text-sm mt-3">
                {errors.ngayChieuGioChieu}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex items-start text-lg">
          <p className="w-1/2 md:w-2/5 lg:w-1/5">Ticket price:</p>
          <div className="w-1/2">
            <Input
              name="giaVe"
              value={values.giaVe}
              onChange={handleChange}
              placeholder="Enter Ticket Price"
              onBlur={handleBlur}
              style={{ width: "100%" }}
            />
            {errors.giaVe && touched.giaVe ? (
              <p className="text-red-500 text-sm mt-3">{errors.giaVe}</p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded ml-0 md:ml-40 lg: ml-1/5"
          //   onClick={handleSubmit}
          onClick={() => {
            manageScheduleServ
              .addSchedule(values)
              .then((res) => {
                notify("Schedule added successfully.");
              })
              .catch((err) => {
                notify(err.data.content);
              });
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddSchedule;
