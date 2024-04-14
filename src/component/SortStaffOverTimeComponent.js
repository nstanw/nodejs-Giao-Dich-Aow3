import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Card, CardImg, CardHeader, CardText } from "reactstrap";
import { Link } from "react-router-dom";
import { axiosGetListStaff } from "../redux/feature/staffSlice";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
const SortStaffOverTime = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(axiosGetListStaff());
  }, []);

  //get state in store
  const staffInState = useSelector((state) => state);

  //get staff in server to store
  let staffs = staffInState.getStaffs.listStaff.listStaff;

  const arrSort = staffs.slice().sort((a, b) => b.overTime - a.overTime);
  console.log("arrSort", arrSort);
  staffs = [...arrSort];
  // setSalary(arrSortES6);
  // setShow(false)

  return (
    <div id="sort-overtime">
      <Breadcrumb className="col-12">
        <BreadcrumbItem>
          <Link to={"/"}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={"/SortOverTime"}>SortOverTime</Link>
        </BreadcrumbItem>
      </Breadcrumb>
      <h4>Nhân viên over time nhiều nhất</h4>
      <div className="row cardovertime">
        {staffs.map((staff) => (
          <div
            key={staff.id}
            id="cardOverTime"
            className="col-6 col-md-4 col-lg-3"
          >
            <Card>
              <CardHeader>{staff.name}</CardHeader>
              <CardImg src={staff.image} alt={staff.name} />
              <CardText>Số giờ làm thêm:{staff.overTime}</CardText>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SortStaffOverTime;
