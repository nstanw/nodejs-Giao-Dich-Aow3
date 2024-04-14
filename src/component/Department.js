import { Card, CardTitle, CardText, CardImg, CardHeader } from "reactstrap";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  axiosGetDepartment,
  axiosGetDeptID,
} from "../redux/feature/departmentSlice";
import { useSelector } from "react-redux";
import Sleep from "../util/sleep";
const Department = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(axiosGetDepartment());
  }, []);

  const departments = useSelector(
    (state) => state.getDepartment.listDepartment.listDepartment
  );
  const Staff = useSelector(
    (state) => state.getDepartment.listDeptID.listStaffDepartment
  );

  const handleClick = (id) => {
    // new Promise(() => {
    //   dispatch(axiosGetDeptID(id));
    // }).then(console.log("done!", Staff));
    dispatch(axiosGetDeptID(id));
  };

  return (
    <div className="row department">
      <Breadcrumb className="col-12">
        <BreadcrumbItem>
          <Link to={"/"}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={"/departments"}>Departments</Link>
        </BreadcrumbItem>
      </Breadcrumb>

      {departments.map((department) => (
        <div className={`col-12 col-md-6 col-lg-4`} key={department.id}>
          <Card onClick={() => handleClick(department.id)}>
            {/* <CardImg src={department.image}  id='department-img'/> */}
            <CardTitle>{department.name}</CardTitle>
            <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
          </Card>
        </div>
      ))}
      <div></div>

      <div className="row">
        {/* <div><p>{Staff === [] ? false : Staff[0].departmentId}</p></div> */}
        {Staff === []
          ? false
          : Staff.map((staff) => (
              <div className="col-12 col-md-6 col-lg-4" key={staff.id}>
                <Card>
                  <CardHeader>{staff.name}</CardHeader>
                  <CardImg src={staff.image} alt={staff.name} />

                  <CardText>
                    Phòng:
                    {staff.departmentId === "Dept01"
                      ? "Sale"
                      : staff.departmentId === "Dept02"
                      ? "HR"
                      : staff.departmentId === "Dept03"
                      ? "Mảketing"
                      : staff.departmentId === "Dept04"
                      ? "IT"
                      : "Finance"}
                  </CardText>
                  <CardText>Số giờ làm thêm:{staff.overTime}</CardText>
                  <CardText>Lương:{staff.salary}</CardText>
                </Card>
              </div>
            ))}
      </div>
    </div>
  );
};
export default Department;
