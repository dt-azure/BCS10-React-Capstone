import { Tabs } from "antd";
import React from "react";
import "./movieSchedule.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const MovieSchedule = ({ cinema }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Tabs
        className="tab_cinema"
        tabPosition="left"
        items={cinema.map((item, index) => {
          if (item.tenCumRap !== "GLX - Nguyễn Du") {
            return {
              label: (
                <div className="text-left uppercase label_cinema">
                  <h4 className="text-green-600 font-medium text-md md:text-lg truncate">
                    {item.tenCumRap}
                  </h4>
                  <p className="text-gray-500 truncate text-xs">
                    {item.diaChi}
                  </p>
                </div>
              ),
              key: index,
              children: (
                <div>
                  {item.danhSachPhim.map((movie, index) => {
                    return (
                      movie.dangChieu && (
                        <div className="flex my-5 mb-8 lg:pr-5" key={index}>
                          <div className="h-48 w-24 lg:w-32 overflow-hidden">
                            <img
                              className="max-w-full"
                              src={movie.hinhAnh}
                              alt=""
                            />
                          </div>
                          <div className="ml-5 w-1/2 lg:w-full">
                            <h3 className="mb-3">
                              <span className="bg-orange-600 text-white rounded py-1 px-2 text-md lg:text-lg font-semibold mr-3">
                                C18
                              </span>
                              <span className="text-lg lg:text-lg font-semibold">
                                {movie.tenPhim}
                              </span>
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                              {movie.lstLichChieuTheoPhim
                                .slice(0, 4)
                                .map((item, index) => {
                                  return (
                                    <div
                                      key={index}
                                      className="schedule-datetime bg-gray-200 rounded p-2 text-center min-w-40 hover:bg-green-500"
                                      onClick={() => {
                                        navigate(`/ticket/${item.maLichChieu}`);
                                      }}
                                    >
                                      <p>
                                        <span className="schedule-date font-semibold text-green-700">
                                          {moment(
                                            item.ngayChieuGioChieu
                                          ).format("DD-MM-YYYY")}
                                        </span>
                                        <span> ~ </span>
                                        <span className="schedule-time font-semibold text-red-500">
                                          {moment(
                                            item.ngayChieuGioChieu
                                          ).format("hh:mm")}
                                        </span>
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              ),
            };
          }
        })}
      />
    </div>
  );
};

export default MovieSchedule;
