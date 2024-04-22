import { Tabs, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { manageCinemaServ } from "../../services/manageCinema";
import MovieSchedule from "../../components/MovieSchedule/MovieSchedule";

const Schedule = () => {
  const [arrCinema, setArrCinema] = useState([]);

  useEffect(() => {
    manageCinemaServ
      .getAllCinemaInfo()
      .then((res) => {
        // console.log(res.data.content);
        setArrCinema(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="">
      <div className="container">
        <div className="my-10 md:my-20">
          <Divider plain>
            <h2 className="font-bold text-2xl text-center">List of Cinemas</h2>
          </Divider>
        </div>
        <Tabs
        className="schedule__content"
          tabPosition="left"
          //   items={new Array(30).fill(null).map((_, i) => {
          //     const id = String(i);
          //     return {
          //       label: `Tab-${id}`,
          //       key: id,
          //       disabled: i === 28,
          //       children: `Content of tab ${id}`,
          //     };
          //   })}

          items={arrCinema.map((cinema, index) => {
            return {
              label: <img src={cinema.logo} className="w-8 md:w-12 lg:w-14" />,
              key: cinema.maHeThongRap,
              children: <MovieSchedule cinema={cinema.lstCumRap} />,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Schedule;
