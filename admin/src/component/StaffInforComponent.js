import dateFormat from "dateformat";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { useSelector } from "react-redux";
import axios from "axios";

const StaffInfor = () => {
  let params = useParams();

  const staffInState = useSelector((state) => state);
  const staffs = staffInState.getStaffs.listStaff.listStaff;

  const [isOpenModal, setOpenModal] = useState(false);
  const [staffInfo, setStaffInfor] = useState(staffs);

  useEffect(() => {
    axios.get("http://localhost:8080/staffs").then((data) => {
      console.log(data.data);

      const staff = data.data.filter(
        (staff) => staff.id === parseInt(params.staffId, 10)
      )[0];
      console.log("data info", staff);

      setStaffInfor(staff);
    });
  }, []);

  const handleConfig = () => {
    toggleModal();
  };

  const handleSubmit = (values, e) => {
    e.preventDefault();

    let data = {
      id: params.staffId,
      departmentId: e.target.value,
      ...values,
    };

    console.log("data to patch", data);
    data = JSON.parse(JSON.stringify(data));

    axios.patch("http://localhost:8080/staffs/", data).catch(console.error());

    setTimeout(() => {
      axios.get("http://localhost:8080/staffs").then((data) => {
        console.log(data.data);

        const staff = data.data.filter(
          (staff) => staff.id === parseInt(params.staffId, 10)
        )[0];
        console.log("data get affter change", staff);

        setStaffInfor(staff);
      });
    }, 500);

    toggleModal();
  };

  //validate
  const required = (val) => val && val.length >= 1;
  const maxLength = (len) => (val) => !val || val.length <= len;
  const minLength = (len) => (val) => val && val.length >= len;

  const toggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  if (true) {
    return (
      <>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={"/staffs"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{staffInfo.name}</BreadcrumbItem>
        </Breadcrumb>

        <div>
          <Modal isOpen={isOpenModal} toggle={toggleModal}>
            <ModalHeader>Sửa nhân viên</ModalHeader>
            <ModalBody>
              <LocalForm className="form-group" onSubmit={handleSubmit}>
                <Row className="form-group">
                  <Label htmlFor="name">Tên</Label>

                  <Control
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Vui lòng nhập "
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(6),
                      maxLength: maxLength(25),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      minLength: "Tên phải ít nhất có 6 kí tự",
                      maxLength: "Tên phải ít hơn 15 kí tự",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="doB">Ngày sinh</Label>
                  <Control
                    type="date"
                    model=".doB"
                    id="doB"
                    name="doB"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  ></Control>
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="startDate">Ngày vào công ty</Label>
                  <Control
                    model=".startDate"
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  ></Control>
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Row>

                <Row className="form-group">
                  <Label htmlFor="department">Phòng ban</Label>
                  <Control.select
                    model=".departmentId"
                    id="departmentId"
                    name="departmentId"
                    className="form-control"
                    defaultValue="Dept01"
                  >
                    <option value={"Dept01"}>Sale</option>
                    <option value={"Dept04"}>IT</option>
                    <option value={"Dept02"}>HR</option>
                    <option value={"Dept03"}>Marketing</option>
                    <option value={"Dept05"}>Finance</option>
                  </Control.select>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="salaryScale">Hệ số lương</Label>
                  <Control
                    model=".salaryScale"
                    type="number"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="Nhập hệ số lương..."
                    className="form-control"
                    validators={{
                      required,
                      valueVal: (val) => val >= 1 && val <= 3,
                    }}
                  ></Control>
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập ",
                      valueVal: "Giá trị từ 1 -> 3",
                    }}
                  />
                </Row>

                <Row className="form-group">
                  <Label htmlFor="overTime">Số ngày nghỉ còn lại</Label>
                  <Control
                    model=".annualLeave"
                    type="number"
                    id="annualLeave"
                    name="annualLeave"
                    placeholder="Vui lòng nhập"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  ></Control>
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Row>

                <Row className="form-group">
                  <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                  <Control
                    model=".overTime"
                    type="number"
                    id="overTime"
                    name="overTime"
                    placeholder="Vui lòng nhập"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  ></Control>
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Row>

                <Button color="primary" type="submit">
                  Thêm
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>

        <div className="row" id="div-infor">
          <div className="col-lg-3 col-md-4 col-12">
            <img
              id="img-profile-tag"
              src={staffInfo.image}
              alt={staffInfo.name}
            ></img>
            <button className="col" onClick={() => handleConfig(staffInfo.id)}>
              <span className="fa fa-comment fa-lg"> Sửa</span>
            </button>
          </div>
          <div className="col-lg-9 col-md-8 col-12 infor">
            <li>Họ và tên: {staffInfo.name}</li>
            <li>Ngày sinh: {dateFormat(staffInfo.doB, "dd/mm/yyyy")}</li>
            <li>
              Ngày vào công ty: {dateFormat(staffInfo.startDate, "dd/mm/yyyy")}
            </li>
            <li>
              Phòng ban:{" "}
              {staffInfo.departmentId === "Dept01"
                ? "Sale"
                : staffInfo.departmentId === "Dept02"
                ? "HR"
                : staffInfo.departmentId === "Dept03"
                ? "Marketing"
                : staffInfo.departmentId === "Dept04"
                ? "IT"
                : staffInfo.departmentId === "Dept05"
                ? "Finance"
                : null}
            </li>
            <li>Ngày nghỉ còn lại: {staffInfo.annualLeave}</li>
            <li>Ngày đi làm thêm: {staffInfo.overTime}</li>
          </div>
        </div>
      </>
    );
  }
};
export default StaffInfor;
