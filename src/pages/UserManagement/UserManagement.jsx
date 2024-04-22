import React, { useContext, useEffect, useRef, useState } from "react";
import { manageUsersServ } from "../../services/manageUsers";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { Table, Input, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersThunk,
  handleEnableUpdateBtn,
  handleSelectUser,
} from "../../redux/slice/userAdminSlice";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import "./userManagement.scss";

const { Search } = Input;

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [backupUserList, setBackupUserList] = useState([]);
  const searchRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuKey, setMenuKey] = useOutletContext();
  const { userArr } = useSelector((state) => state.userAdminSlice);
  const notify = useContext(NotifyContext);
  const windowWidth = window.innerWidth;
  let columns = [];

  if (windowWidth < 768) {
    columns = [
      {
        title: "Username",
        dataIndex: "taiKhoan",
        key: "taiKhoan",
        width: "40%",
      },
      {
        title: "Account Type",
        dataIndex: "maLoaiNguoiDung",
        key: "maLoaiNguoiDung",
        width: "30%",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "30%",
      },
    ];
  } else {
    columns = [
      {
        title: "Username",
        dataIndex: "taiKhoan",
        key: "taiKhoan",
        width: "20%",
      },
      {
        title: "Full Name",
        dataIndex: "hoTen",
        key: "hoTen",
        width: "20%",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%",
      },
      {
        title: "Phone Number",
        dataIndex: "soDT",
        key: "soDT",
        width: "15%",
      },
      {
        title: "Account Type",
        dataIndex: "maLoaiNguoiDung",
        key: "maLoaiNguoiDung",
        width: "15%",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "10%",
      },
    ];
  }

  const handleFilterUser = () => {
    let newUserList = [...backupUserList];

    newUserList = newUserList.filter((item) =>
      item.taiKhoan.toLowerCase().includes(searchRef.current.input.value)
    );
    setUserList(newUserList);
  };

  const handleRenderUserList = () => {
    let newUserList = [];
    userArr.map((item, index) => {
      let newUserItem = {
        key: index,
        taiKhoan: item.taiKhoan,
        hoTen: item.hoTen,
        email: item.email,
        soDT: item.soDT,
        maLoaiNguoiDung: item.maLoaiNguoiDung,
        action: (
          <div className="flex gap-3 text-xl">
            <Tooltip title="Edit User" trigger="hover">
              <EditOutlined
                className="transition-all ease-in-out text-blue-600 hover:-translate-y-1 duration-300"
                onClick={() => {
                  dispatch(handleSelectUser(item));
                  dispatch(handleEnableUpdateBtn());
                  navigate(`/admin/add-user/edit-${item.taiKhoan}`);
                }}
              />
            </Tooltip>

            <Tooltip title="Delete User" trigger="hover">
              <DeleteOutlined
                className="transition-all ease-in-out text-red-600 hover:-translate-y-1 duration-300"
                onClick={async () => {
                  await manageUsersServ
                    .deleteUser(item.taiKhoan)
                    .then((result) => {
                      notify("User removed successfully.");
                      dispatch(getAllUsersThunk())
                        .then((res) => {
                          handleRenderUserList();
                          handleFilterUser();
                        })
                        .catch((err) => {});
                    })
                    .catch((err) => {
                      notify("Error occurred.");
                    });
                }}
              />
            </Tooltip>
          </div>
        ),
      };

      newUserList.push(newUserItem);
    });
    setUserList(newUserList);
    setBackupUserList(newUserList);
  };

  useEffect(() => {
    setMenuKey(["3"]);
    dispatch(getAllUsersThunk());
  }, []);

  useEffect(() => {
    handleRenderUserList();
  }, [userArr]);

  return (
    <div className="user-table">
      <h1 className="font-bold text-3xl">User Manager</h1>
      <button
        className="my-5 px-5 py-2 bg-black text-white rounded font-semibold"
        onClick={() => {
          navigate("/admin/add-user");
        }}
      >
        Add User
      </button>
      <div className="search-box">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleFilterUser}
          onChange={handleFilterUser}
          ref={searchRef}
        />
      </div>
      <Table
        className="mt-5"
        dataSource={userList}
        columns={columns}
        sticky={true}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
        }}
      />
    </div>
  );
};

export default UserManagement;
