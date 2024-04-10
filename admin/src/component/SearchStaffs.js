import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { axiosGetListStaff } from "../redux/feature/staffSlice";

export const SearchStaffs = () => {
  const dispatch = useDispatch();

  //get staff in server to store
  const staffInState = useSelector((state) => state);
  const staffs = staffInState.getStaffs.listStaff.listStaff;
 
  console.log("staffs", staffs);
  const [staffSearch, setStaffSearch] = useState(staffs);
  const [show, setShow] = useState(false);


console.log("staffSearch",staffSearch);
  useEffect(() => {
    dispatch(axiosGetListStaff());
    setShow(true);
  }, []);

  const handleSearchName = () => {
    console.log("handle");
    const searchText = document.getElementById("search-name").value.toLowerCase();
    const listStaffSearch = staffs.filter((staff) => staff.name.toLowerCase().includes(searchText));
   console.log("listStaffSearch handle",listStaffSearch);
    setStaffSearch(listStaffSearch);
    setShow(false);
  };

  return (
    <>
      <div className="staff-list row">
        <Breadcrumb className="col-12">
          <BreadcrumbItem>
            <Link to={"/"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={"/staffs"}>Staffs</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12 row">
          <div className="col-6 col-xs-12" id="button-sort">
            <label className="col- col-xs-12">Sắp xếp theo:</label>
            <Link to="/SortDepartment">
              <button className="col- col-xs-12">Phòng ban</button>
            </Link>
            <Link to="/SortOverTime">
              <button className="col- col-xs-12">OverTime</button>
            </Link>
          </div>
          <div>
            <input
              className="col-6"
              // onChange={(e) => handleSearchName(e.target.value).toLowerCase()}
              id="search-name"
              placeholder="enter name...."
            ></input>
            {/* <Link to="/Search"> */}
              <button onClick={handleSearchName}>Search</button>
          
          </div>
        </div>

        {!show && staffSearch.map((staff) => (
          <div className={`col-6 col-md-4 col-lg-2`} key={staff.id}>
            <Link to={`/staffs/${staff.id}`}>
              <img
                id="img-profile-tag"
                src={staff.image}
                alt={staff.name}
              ></img>
              <h5 id="name-staff">{staff.name}</h5>
            </Link>
          </div>
        ))}

        {show &&
          staffs.map((staff) => (
            <div className={`col-6 col-md-4 col-lg-2`} key={staff.id}>
              <Link to={`/staffs/${staff.id}`}>
                <img
                  id="img-profile-tag"
                  src={staff.image}
                  alt={staff.name}
                ></img>
                <h5 id="name-staff">{staff.name}</h5>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
};
export default SearchStaffs;
