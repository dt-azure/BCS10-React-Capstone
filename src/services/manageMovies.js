import { http, http_access } from "./config";

export const controller = new AbortController();

export const manageMoviesServ = {
  getAllBanner: () => {
    return http.get("/QuanLyPhim/LayDanhSachBanner");
  },
  getAllMovie: () => {
    return http.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
  },
  uploadMovie: (data) => {
    return http.post("/QuanLyPhim/ThemPhimUploadHinh", data);
  },
  updateMovie: (data) => {
    return http_access.post(`/QuanLyPhim/CapNhatPhimUpload`, data);
  },
  deleteMovie: (data) => {
    return http_access.delete(`/QuanLyPhim/XP?MaPhim=${data}`);
  },
  getSchedule: (id) => {
    return http.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`, {
      signal: controller.signal,
    });
  },
};
