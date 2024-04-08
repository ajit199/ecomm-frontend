import React, { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import { getData, patchData } from "../../utils/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { UserContext } from "../../context/UserContext";
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [totalCategories, setTotalCategories] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useContext(UserContext);
  const catsPerPage = 6;
  const navigate = useNavigate();

  const spinner = (
    <Oval
      visible={isLoading}
      height="50"
      width="50"
      color="blue"
      strokeWidth={4}
      ariaLabel="oval-loading"
      wrapperStyle={{
        border: "none",
      }}
      wrapperClass=""
    />
  );

  function getCategories() {
    getData(
      `category/get-categories?skip=${
        currentPage * catsPerPage
      }&limit=${catsPerPage}`
    )
      .then((data) => {
        setCategories(data?.data);
        setTotalCategories(data?.total);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function getUserCategories() {
    setIsLoading(true);
    getData(`category/get-user-categories`)
      .then((data) => {
        setIsLoading(false);
        setSelectedCategories(data?.data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
  }

  useEffect(() => {
    if (userToken) {
      getCategories();
    }
  }, [currentPage]);

  useEffect(() => {
    if (userToken) {
      getUserCategories();
    } else {
      navigate("/login");
    }
  }, []);

  // Function to save category selections to backend
  const updateUserCategories = (catId) => {
    setIsLoading(true);
    patchData(`category/update-user-categories`, {
      catId,
    })
      .then((data) => {
        setIsLoading(false);
        getCategories();
        getUserCategories();
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("err", error);
      });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="category-container">
      <div className="category">
        <h2>Please mark your interests!</h2>
        <p>We will keep you notified</p>
        <h3>My saved interests!</h3>
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {spinner}
          </div>
        ) : (
          categories.map((category) => {
            return (
              <div key={category?.id} className="cat-form-group">
                <input
                  type="checkbox"
                  checked={selectedCategories[category.id] ? true : false}
                  onChange={() => updateUserCategories(category.id)}
                />
                <label>{category.name}</label>
              </div>
            );
          })
        )}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          onPageChange={handlePageClick}
          pageCount={Math.ceil(totalCategories / catsPerPage)}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Category;
