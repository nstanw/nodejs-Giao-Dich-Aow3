import NavComponent from "./NavComponent";
import Footer from "./FooterComponent";
import { Routes, Route, useLocation } from "react-router-dom";
import GiaoDichs from "./giaoDich";
import GoogleAccountCRUD from "./taiKhoan";
import KhachHangs from "./khachHang";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";
import DetailGiaoDich from "./giaoDich/detail";

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
            <Route path="/:userId" element={<DetailGiaoDich />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}

export default Main;
