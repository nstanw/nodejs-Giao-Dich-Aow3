import {
  Card,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { axiosGetStaffsSalary } from "../redux/feature/salarySlice";

const SalaryScale = () => {
  const dispatch = useDispatch();

  var selecStaffs = useSelector(
    (state) => state.getSalaryScale.listStaffsSalary.listStaffsSalary
  );

  const arrCloneSalary = [...selecStaffs];
  console.log("arrCloneSalary", arrCloneSalary);

  // k set state dc
  const [salarys, setSalary] = useState(arrCloneSalary);
  const [show, setShow] = useState(false);
  
  console.log("salarys", salarys);

  useEffect(() => {
    dispatch(axiosGetStaffsSalary());
    setShow(true);
  }, []);

  //onchange
  const handleChage = () => {
    let selectValue = document.getElementById("selectSalary").value;
    console.log(selectValue);
    if (selectValue === "id-down") {
      const arrSort = selecStaffs.slice().sort((a, b) => b.id - a.id);
      console.log("arrSort", arrSort);
      const arrSortES6 = [...arrSort];
      setSalary(arrSortES6);
      setShow(false)

    }
    if (selectValue === "id") {
      console.log("id up");
      const salarySort = selecStaffs;
      const arrSort = salarySort.slice().sort((a, b) => a.id - b.id);
      console.log("arrSort", arrSort);
      const arrSortES6 = [...arrSort];
      setSalary(arrSortES6);
      setShow(false);
  
    }
    if (selectValue === "salaryUptoDown") {
      console.log("enter salaryUptoDown");
      const arrSort = salarys.sort((a, b) => b.salary - a.salary);
      const arrSortES6 = [...arrSort];
      setSalary(arrSortES6);
      setShow(false);
    }
    if (selectValue === "salaryDowntoUp") {
      console.log("enter salaryDowntoUp");
      const arrSort = salarys.sort((a, b) => a.salary - b.salary);
      const arrSortES6 = [...arrSort];
      setSalary(arrSortES6);
      setShow(false);
    }
  };
  return (
    <div className="row salary">
      <div className="col-12">
        <Breadcrumb className="col-6">
          <BreadcrumbItem>
            <Link to={"/"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={"/salaryscale"}>Salary</Link>
          </BreadcrumbItem>
        </Breadcrumb>

        <select onChange={handleChage} id="selectSalary">
          <option value="id">sắp xếp: mã nhân viên</option>
          <option value="id-down">Mã nhân viên cao đến thấp</option>

          <option value="salaryUptoDown">Lương từ cao đến thấp</option>
          <option value="salaryDowntoUp">Lương từ thấp đến cao</option>
        </select>
      </div>

      {show &&
        arrCloneSalary.map((staff) => (
          <div className={`col-12 col-md-6 col-lg-4`} key={staff.id}>
            <Card>
              <CardTitle>{staff.name}</CardTitle>
              <CardText>Mã nhân viên: {staff.id}</CardText>
              <CardText>Hệ số lương: {staff.salaryScale}</CardText>
              <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
              <CardText>Lương: {staff.salary}</CardText>
            </Card>
          </div>
        ))}

{
        salarys.map((staff) => (
          <div className={`col-12 col-md-6 col-lg-4`} key={staff.id}>
            <Card>
              <CardTitle>{staff.name}</CardTitle>
              <CardText>Mã nhân viên: {staff.id}</CardText>
              <CardText>Hệ số lương: {staff.salaryScale}</CardText>
              <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
              <CardText>Lương: {staff.salary}</CardText>
            </Card>
          </div>
        ))}

    </div>
  );
};
export default SalaryScale;
