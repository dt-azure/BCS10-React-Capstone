import React from "react";
import { Button, Popover } from "antd";
import "./popoever.scss"

const PopoverCustom = ({ label, content }) => {
  return (
    <>
      <Popover content={content} title="">
        <Button >{label}</Button>
      </Popover>
    </>
  );
};

export default PopoverCustom;
