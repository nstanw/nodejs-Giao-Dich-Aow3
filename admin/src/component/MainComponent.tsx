import NavComponent from "./NavComponent";
import Footer from "./FooterComponent";
import { Routes, Route, useLocation } from "react-router-dom";
import GiaoDichs from "./giaoDich";
import GoogleAccountCRUD from "./taiKhoan";
import KhachHangs from "./khachHang";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";

function Main() {
  const location = useLocation();
  
  return (
    <div className="container ">
      <NavComponent onChangeCol={undefined} />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes>
            <Route path="/" element={<GiaoDichs/>} />
          
            <Route path="/taiKhoans" element={<GoogleAccountCRUD />} />
            <Route path="/khachHangs" element={<KhachHangs />} />
            {/* <Route exact path="/staffs/:staffId" element={<StaffInfor />} /> */}
            {/* <Route
              path="/departments"
              element={<Department departments={departments} col={col} />}
            /> */}
            {/* <Route path="/salaryscale" element={<SalaryScale />} /> */}
            {/* <Route
              path="/SortDepartment"
              element={<StaffWithDepartment col={col} />}
            />
            <Route path="/SortOverTime" element={<SortStaffOverTime />} />
            <Route path="/Search" element={<SearchStaffs staffs={staffs} />} /> */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default Main;
