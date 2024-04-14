import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";
const SalaryScale = ({ staffs, col }) => {
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

        <select>
          <option value="">sắp xếp: mã nhân viên</option>
          <option value="">Mã nhân viên cao đến thấp</option>
          <option value="">Lương từ cao đến thấp</option>
          <option value="">Lương từ thấp đến cao</option>
        </select>
      </div>
      {staffs.map((staff) => (
        <div
          key={staff.id}
          className={col !== "" ? col : `col-6 col-md-4 col-lg-2`}
        >
          <Card>
            <CardTitle>{staff.name}</CardTitle>
            <CardText>Mã nhân viên: {staff.id}</CardText>
            <CardText>Hệ số lương: {staff.salaryScale}</CardText>
            <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
            <CardText>
              Lương:
              {staff.salaryScale * 3000000 + (200000 / 8) * staff.overTime}
            </CardText>
          </Card>
        </div>
      ))}
    </div>
  );
};
export default SalaryScale;
