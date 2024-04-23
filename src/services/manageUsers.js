import { http, http_access } from "./config";

export const manageUsersServ = {
  signIn: (data) => {
    return http.post("/QuanLyNguoiDung/DangNhap", data);
  },
  getAllUsers: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachNguoiDung");
  },
  getAllUserTypes: () => {
    return http.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
  },
  addUser: (data) => {
    return http_access.post("/QuanLyNguoiDung/ThemNguoiDung", data);
  },
  updateUser: (data) => {
    return http_access.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
  },
  deleteUser: (account) => {
    return http_access.delete(
      `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`
    );
  },
  getBookingDetails: () => {
    return http_access.post(`/QuanLyNguoiDung/ThongTinTaiKhoan`);
  },
  signUp: (data) => {
    return http.post("/QuanLyNguoiDung/DangKy", data)
  }
};
