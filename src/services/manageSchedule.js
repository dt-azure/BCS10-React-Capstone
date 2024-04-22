import { http_access } from "./config";

export const manageScheduleServ = {
  addSchedule: (data) => {
    return http_access.post("/QuanLyDatVe/TaoLichChieu", data);
  },
  bookTicket: (data) => {
    return http_access.post("/QuanLyDatVe/DatVe", data);
  },
};
