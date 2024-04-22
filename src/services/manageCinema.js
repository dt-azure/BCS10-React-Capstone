import { http } from "./config";

export const manageCinemaServ = {
  getAllCinemaInfo() {
    return http.get("/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP03");
  },
  getCinemaInfo(id) {
    return http.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
  },
  getCinemaGroupInfo() {
    return http.get("/QuanLyRap/LayThongTinHeThongRap");
  },
  getLocationInfo(id) {
    return http.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`
    );
  },
};
