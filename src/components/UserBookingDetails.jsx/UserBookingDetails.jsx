import { Avatar, Button, List, Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { manageUsersServ } from "../../services/manageUsers";
import "./userBookingDetails.scss";
import { getLocalStorage, saveLocalStorage } from "../../utils/util";
import { UserContext } from "../../pages/AccountManagement/AccountManagement";
import "../Loading/loading.scss";
import dayjs from "dayjs";

export const formatDate = (item) => {
  return dayjs(item).format("DD/MM/YYYY");
};

export const formatTime = (item) => {
  let time = new Date(item);
  let hour = time.getHours();
  let minute = time.getMinutes();
  return `${hour < 10 ? "0" + hour : hour}:${
    minute < 10 ? "0" + minute : minute
  }`;
};

const UserBookingDetails = () => {
  const { userDetails } = useContext(UserContext);
  const [bookingList, setBookingList] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [pointer, setPointer] = useState(5);
  const [user, setUser] = useState({});

  const formatSeatList = (item) => {
    let output = [];
    item.map((seat) => {
      output.push(seat.tenGhe);
    });
    return output.join(" - ");
  };

  const onLoadMore = () => {
    console.log(user);
    setLoading(true);
    const newBookingList = bookingList.concat(
      [...user.thongTinDatVe].slice(pointer, pointer + 5)
    );
    setPointer((prev) => prev + 5);
    console.log(pointer);
    setBookingList(newBookingList);
    setLoading(false);
    window.dispatchEvent(new Event("resize"));
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>Load More</Button>
      </div>
    ) : null;

  useEffect(() => {
    const handleGetBookingDetails = async () => {
      await manageUsersServ
        .getBookingDetails()
        .then((res) => {
          saveLocalStorage("booking", res.data.content);
          setUser(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });

      // setBookingList([...user.thongTinDatVe].slice(0, 5));
    };
    
    handleGetBookingDetails();
  }, []);

  useEffect(() => {
    if (user.thongTinDatVe) {
      setBookingList([...user.thongTinDatVe].slice(0, 5));
    }
    setDataLoading(false);
    setInitLoading(false);
  }, [user]);
  return (
    <>
      {dataLoading ? (
        <>
          <div className="flex justify-center items-center account-loading-screen">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
          <p className="font-bold text-center text-lg my-1">
            Getting data, please wait...
          </p>
        </>
      ) : (
        <div className="container pb-5">
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={bookingList}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <div className="booking-img">
                        <img
                          src={item.hinhAnh}
                          className="rounded-sm object-cover w-16 md:w-24"
                        ></img>
                      </div>
                    }
                    title={<p className="font-bold text-md md:text-lg">{item.tenPhim}</p>}
                    description={
                      <div className="space-y-3 md:space-y-0">
                        <p>
                          Date: <span>{formatDate(item.ngayDat)}</span>
                        </p>
                        <p>
                          Time: <span>{formatTime(item.ngayDat)}</span>
                        </p>
                        <p>
                          Duration: <span>{item.thoiLuongPhim} minutes</span>
                        </p>
                        <p>
                          Ticket Price:{" "}
                          <span className="font-bold text-orange-500">
                            {Intl.NumberFormat("en", {
                              minimumFractionDigits: 2,
                            }).format(item.giaVe)}
                          </span>{" "}
                          VND
                        </p>
                        <p>
                          Total Spend:{" "}
                          <span className="font-bold text-green-600">
                            {Intl.NumberFormat("en", {
                              minimumFractionDigits: 2,
                            }).format(item.danhSachGhe.length * item.giaVe)}
                          </span>{" "}
                          VND
                        </p>
                      </div>
                    }
                  />
                  <div className="seat-list space-y-3 md:space-y-0 ml-4 md:ml-0">
                    <p className="font-bold text-md md:text-lg">Booking Information:</p>
                    <p>
                      Amount:{" "}
                      <span className="font-bold text-green-600">
                        {item.danhSachGhe.length}
                      </span>
                    </p>
                    <p>
                      Cinema:{" "}
                      <span className="font-bold">
                        {item.danhSachGhe[0].maHeThongRap}
                      </span>
                    </p>
                    <p>
                      Location:{" "}
                      <span className="font-bold">
                        {item.danhSachGhe[0].tenHeThongRap}
                      </span>
                    </p>
                    <p>
                      Showroom:{" "}
                      <span className="font-bold">
                        {item.danhSachGhe[0].tenRap}
                      </span>
                    </p>
                    <p>
                      Seats:{" "}
                      <span className="font-bold">
                        {formatSeatList(item.danhSachGhe)}
                      </span>
                    </p>
                  </div>
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
      )}
    </>
  );
};

export default UserBookingDetails;
