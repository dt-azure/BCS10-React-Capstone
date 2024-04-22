import { Tabs, Card } from "antd";
import React from "react";
import "./movieSchedule.scss";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const handleFormatDate = (date) => {
  let newDate = dayjs(date);
  return newDate.format("DD/MM/YYYY - HH:mm");
};

const MovieSchedule = ({ cinema }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Tabs
        className="tab_cinema"
        tabPosition="left"
        items={cinema.cumRapChieu.map((item, index) => {
          if (item.tenCumRap !== "GLX - Nguyễn Du") {
            return {
              label: (
                <div className="text-left uppercase label_cinema">
                  <h4 className="text-green-600 font-medium text-lg truncate">
                    {item.tenCumRap}
                  </h4>
                  <p className="text-gray-500 truncate text-xs">
                    {item.diaChi}
                  </p>
                </div>
              ),
              key: index,
              children: (
                <div className="space-y-8 lg:flex lg:gap-5 lg:space-y-0 px-5">
                  {item.lichChieuPhim.map((slot, index) => {
                    return (
                      <Card
                        title={handleFormatDate(slot.ngayChieuGioChieu)}
                        bordered={false}
                        style={{
                          width: 250,
                        }}
                        className="schedule-card"
                        onClick={() => {
                          navigate(`/ticket/${slot.maLichChieu}`);
                        }}
                      >
                        <p>
                          Showroom: <span>{slot.tenRap}</span>
                        </p>
                      </Card>
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
