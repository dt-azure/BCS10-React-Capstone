import React, { useContext } from "react";
import "./userDetails.scss";
import { Button, Card, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UserContext } from "../../pages/AccountManagement/AccountManagement";
import { useDispatch } from "react-redux";
import { handleEnableUpdateBtn } from "../../redux/slice/userAdminSlice";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { userDetails, activeTabContext } = useContext(UserContext);
  const [activeTab, setActiveTab] = activeTabContext;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="text-center p-5 bg-white">
      <div className="flex w-full">
        <div className="mx-auto text-left w-80-screen lg:w-1/2 flex gap-10">
          <div className="w-1/2">
            <p className="font-bold text-md md:text-lg mb-3">Username:</p>

            <Card
              bordered={false}
              style={{
                width: "100%",
              }}
              className="text-md md:text-lg"
            >
              <Input value={userDetails.taiKhoan} />
            </Card>
            <p className="font-bold text-md-center md:text-lg mb-3 mt-5">
              Full name:
            </p>
            <Card
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Input value={userDetails.hoTen} />
            </Card>
            <Button
              id="account-edit-btn"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                dispatch(handleEnableUpdateBtn());
                navigate(`/update-user/${userDetails.taiKhoan}`);
              }}
            >
              Edit Info
            </Button>
          </div>
          <div className="w-1/2">
            <p className="font-bold text-md-center md:text-lg mb-3">Email:</p>
            <Card
              bordered={false}
              style={{
                width: "100%",
              }}
              className=""
            >
              <Input value={userDetails.email} />
            </Card>
            <p className="font-bold text-md-center md:text-lg mb-3 mt-5">
              Phone number:
            </p>
            <Card
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Input value={userDetails.soDT} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
