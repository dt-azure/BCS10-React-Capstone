import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import seat_empty from "../../assets/img/seat_empty.png";
import seat_booked from "../../assets/img/seat_booked.png";
import seat_chosen from "../../assets/img/seat_chosen.png";
import "./seatLayout.scss";
import { List } from "antd";
import { controller, manageMoviesServ } from "../../services/manageMovies";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";

import { manageScheduleServ } from "../../services/manageSchedule";
import { useNavigate } from "react-router-dom";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { token } from "../../services/config";

const SeatLayout = () => {
  const { scheduleId } = useParams();
  const [schedule, setSchedule] = useState();
  const [seatLayout, setSeatLayout] = useState([]);
  const dispatch = useDispatch();
  const [selectedSeat, setSelectedSeat] = useState([]);
  const { isLoading, isCount } = useSelector((state) => state.loadingSlice);
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const tempSeatLayout = Array(160)
    .fill()
    .map((_, i) => (
      <div>
        <img src={seat_empty} alt="" />
      </div>
    ));

  const handleSelectSeat = (seat) => {
    const seatIndex = parseInt(seat.stt) - 1;

    if (!seat.daDat) {
      let newLayout = [...seatLayout];
      // console.log(newLayout);
      // console.log(seatIndex);
      newLayout[seatIndex].daDat = true;
      setSeatLayout(newLayout);
      setSelectedSeat((prevSelection) => [...prevSelection, seat]);
    } else {
      let newLayout = [...seatLayout];
      let newSelectedSeat = [...selectedSeat];
      const selectedSeatIndex = newSelectedSeat.findIndex(
        (item) => item.maGhe == seat.maGhe
      );
      newLayout[seatIndex].daDat = false;
      setSeatLayout(newLayout);
      newSelectedSeat.splice(selectedSeatIndex, 1);
      // console.log(newSelectedSeat);
      setSelectedSeat(newSelectedSeat);
    }
  };

  const handleGetTotalSpend = () => {
    if (selectedSeat) {
      let total = 0;
      for (let i of selectedSeat) {
        total += i.giaVe;
      }
      return total;
    }
    return "";
  };

  const handleBookTicket = async () => {
    let ticketList = [];
    for (let i of selectedSeat) {
      ticketList.push({
        maGhe: i.maGhe,
        giaVe: i.giaVe,
      });
    }

    try {
      await manageScheduleServ.bookTicket({
        maLichChieu: scheduleId,
        danhSachVe: ticketList,
      });
      notify("Ticket(s) booked successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
      notify("An error has occured.");
    }
  };

  useEffect(() => {
    const handleGetSchedule = async () => {
      try {
        const scheduleRes = await manageMoviesServ.getSchedule(scheduleId);
        // console.log(scheduleRes);

        setSchedule(scheduleRes.data.content);
      } catch (err) {
        console.log(err);
        dispatch(handleLoadingOff());
      }
    };
    dispatch(handleLoadingOn());
    handleGetSchedule();
    setSelectedSeat([]);
    dispatch(handleLoadingOff());

    return () => {
      // controller.abort();
    };
  }, []);

  useEffect(() => {
    dispatch(handleLoadingOn());
    // handleSetSeatLayout();
    setSeatLayout(schedule ? schedule.danhSachGhe : []);
    dispatch(handleLoadingOff());
  }, [schedule]);

  return (
    <div className="bg-black bg-opacity-80 p-10">
      <div className="container">
        <div className="flex flex-col lg:flex-row">
          <div className="seat-layout w-full lg:w-3/5 flex flex-col justify-center">
            <div className="screen h-10 w-full bg-orange-400 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-100 flex items-center justify-center">
              <p className="align-middle">Screen</p>
            </div>
            <div className="seat-selection mt-16 py-5 px-10 lg:px-20">
              <div className="seat-grid grid gap-2 gap-y-4">
                {schedule
                  ? seatLayout.map((item) => {
                      if (item.daDat && item.taiKhoanNguoiDat) {
                        return (
                          <div>
                            <img src={seat_booked} alt="" />
                          </div>
                        );
                      } else if (item.daDat) {
                        return (
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => {
                              handleSelectSeat(item);
                            }}
                          >
                            <img src={seat_chosen} alt="" />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => {
                              handleSelectSeat(item);
                            }}
                          >
                            <img src={seat_empty} alt="" />
                          </div>
                        );
                      }
                    })
                  : tempSeatLayout}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 py-5 pl-0 lg:pl-20 mt-5 lg:mt-0 text-white ">
            <div className="seat-details px-10 py-5 space-y-5">
              <p className="text-center mb-10 font-bold text-2xl">
                {schedule ? schedule.thongTinPhim.tenPhim : ""}
              </p>
              <div className="flex items-center">
                <p className="w-1/3">Date:</p>
                <p className="font-bold text-orange-400">
                  {schedule ? schedule.thongTinPhim.ngayChieu : ""}
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-1/3">Time:</p>
                <p className="font-bold text-orange-400">
                  {schedule ? schedule.thongTinPhim.gioChieu : ""}
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-1/3">Cinema:</p>
                <p className="font-bold text-orange-400">
                  {schedule ? schedule.thongTinPhim.tenCumRap : ""}
                </p>
              </div>
              <div>
                <p>Selected Seats:</p>
                <List
                  id="custom-scrollbar"
                  className="flex overflow-y-auto h-60 mt-5"
                  itemLayout="horizontal"
                  dataSource={selectedSeat}
                  renderItem={(item, index) => (
                    <List.Item className="flex items-center">
                      <p className="flex-col items-start md:flex-none w-1/3 lg:w-1/5 text-white">
                        <span className="block md:inline font-bold text-orange-400 mr-2">
                          Seat:
                        </span>{" "}
                        <span className="block md:inline">{item.tenGhe}</span>
                      </p>
                      <p className="flex-col items-start md:flex-none w-1/3 lg:w-2/5 text-white">
                        <span className="block md:inline font-bold text-orange-400 ml-2 lg:ml-6 mr-2">
                          Type:
                        </span>{" "}
                        <span className="block md:inline">{item.loaiGhe}</span>
                      </p>
                      <p className="flex-col items-start md:flex-none w-1/3 lg:w-2/5 text-right pr-5 text-white">
                        <span className="block md:inline font-bold text-orange-400 mr-2">
                          Price:
                        </span>{" "}
                        <span className="block md:inline">
                          {Intl.NumberFormat("en-US").format(item.giaVe)}
                        </span>
                      </p>
                    </List.Item>
                  )}
                />
              </div>
              <div className="summary">
                <div className="flex items-center justify-between">
                  <p className="">Total Spend:</p>
                  <p className="font-bold text-orange-400">
                    {Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                    }).format(handleGetTotalSpend())}{" "}
                    VND
                  </p>
                </div>
                <button
                  type="button"
                  className="text-white bg-orange-500 hover:bg-orange-600 rounded-sm py-3 mt-5 w-full font-bold"
                  onClick={handleBookTicket}
                >
                  Book Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
