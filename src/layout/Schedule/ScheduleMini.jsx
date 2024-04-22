import React, { useEffect, useState } from "react";
import { manageCinemaServ } from "../../services/manageCinema";
import MovieScheduleMini from "../../components/MovieSchedule/MovieScheduleMini";
import { Tabs } from "antd";

const ScheduleMini = ({ id }) => {
  const [arrCinema, setArrCinema] = useState({});
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const handleGetSchedule = async () => {
      try {
        const res = await manageCinemaServ.getCinemaInfo(id);
        console.log(res)
        const cinemaInfo = res.data.content;
        setArrCinema(cinemaInfo);

        if (cinemaInfo.heThongRapChieu.length !== 0) {
          setIsEmpty(false);
        }
      } catch (err) {
        console.log(err)
      }
    };
    handleGetSchedule();
    console.log(arrCinema)
  }, []);

  return (
    <>
      {isEmpty ? (
        <p className="font-bold text-2xl text-center">No schedule available</p>
      ) : (
        <div className="my-10">
          <h2 className="font-bold text-2xl text-center">Schedule</h2>

          <div className="container mt-5">
            <Tabs
              tabPosition="left"
              items={arrCinema.heThongRapChieu.map((cinema, index) => {
                // console.log(cinema)
                return {
                  label: <img src={cinema.logo} className="w-14" />,
                  key: cinema.maHeThongRap,
                  children: <MovieScheduleMini cinema={cinema} />,
                };
              })}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleMini;
