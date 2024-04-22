import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { Input, Table, Tooltip } from "antd";
import "./movieManagement.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieThunk,
  getAllMoviesThunk,
} from "../../redux/slice/movieSlice";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  handleEnableUpdateBtn,
  handleSelectMovie,
} from "../../redux/slice/movieAdminSlice";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../../redux/slice/loadingSlice";

const { Search } = Input;

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};
const MovieManagement = () => {
  const { arrMovie } = useSelector((state) => state.movieSlice);
  const dispatch = useDispatch();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [menuKey, setMenuKey] = useOutletContext();
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const handleRenderMovieList = () => {
    let newDataSource = [];

    arrMovie.map((item, index) => {
      let newMovieItem = {
        key: index,
        maPhim: item.maPhim,
        hinhAnh: <img style={{ height: "100px" }} src={item.hinhAnh}></img>,
        tenPhim: item.tenPhim,
        moTa: item.moTa,
        action: (
          <div className="flex gap-3 text-xl">
            <Tooltip title="Edit Movie" trigger="hover">
              <EditOutlined
                className="transition-all ease-in-out text-blue-600 hover:-translate-y-1 duration-300"
                onClick={() => {
                  dispatch(handleSelectMovie(item));
                  dispatch(handleEnableUpdateBtn());
                  navigate(`/admin/add-movie/update-${item.tenPhim}`);
                }}
              />
            </Tooltip>

            <Tooltip title="Delete Movie" trigger="hover">
              <DeleteOutlined
                className="transition-all ease-in-out text-red-600 hover:-translate-y-1 duration-300"
                onClick={() => {
                  dispatch(handleLoadingOn());
                  dispatch(deleteMovieThunk(item.maPhim))
                    .then((res) => {
                      dispatch(getAllMoviesThunk());
                    })
                    .catch((err) => {
                      console.log(err);
                    });

                  dispatch(handleLoadingOff());
                }}
              />
            </Tooltip>

            <Tooltip title="Add Schedule" trigger="hover">
              <CalendarOutlined
                className="transition-all ease-in-out text-green-600 hover:-translate-y-1 duration-300"
                onClick={() => {
                  dispatch(handleSelectMovie(item));
                  navigate(`/admin/add-schedule/${item.tenPhim}`);
                }}
              />
            </Tooltip>
          </div>
        ),
      };

      newDataSource.push(newMovieItem);
    });

    setDataSource(newDataSource);
  };

  const windowWidth = window.innerWidth;

  let columns = [];
  if (windowWidth < 1024) {
    columns = [
      {
        title: "Movie ID",
        dataIndex: "maPhim",
        key: "maPhim",
        width: "20%",
      },
      {
        title: "Movie Name",
        dataIndex: "tenPhim",
        key: "tenPhim",
        width: "50%",
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
        title: "Movie ID",
        dataIndex: "maPhim",
        key: "maPhim",
        width: "10%",
      },
      {
        title: "Movie Poster",
        dataIndex: "hinhAnh",
        key: "hinhAnh",
        width: "10%",
      },
      {
        title: "Movie Name",
        dataIndex: "tenPhim",
        key: "tenPhim",
        width: "20%",
      },
      {
        title: "Movie Description",
        dataIndex: "moTa",
        key: "moTa",
        width: "50%",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: "10%",
      },
    ];
  }

  useEffect(() => {
    setMenuKey(["2"]);
    dispatch(getAllMoviesThunk());
  }, []);

  useEffect(() => {
    handleRenderMovieList();
  }, [arrMovie]);

  return (
    <div>
      <h1 className="font-bold text-3xl">Movie Manager</h1>
      <button
        className="my-5 px-5 py-2 bg-black text-white rounded font-semibold"
        // onClick={() => {
        //   setMenuKey(["1"]);
        // }}
      >
        <NavLink to="/admin/add-movie">Add Movie</NavLink>
      </button>
      <div className="search-box">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Table
        className="mt-5"
        dataSource={dataSource}
        columns={columns}
        sticky={true}
        rowClassName="movie-table-row"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50", "100"],
        }}
        // pagination={tableParams.pagination}
        // onChange={handleTableChange}
      />
    </div>
  );
};

export default MovieManagement;
