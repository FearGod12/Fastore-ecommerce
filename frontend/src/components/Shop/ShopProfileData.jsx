import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
// import Ratings from "../Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:flex items-center">
            <div
              className={`flex items-center ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
              onClick={() => setActive(1)}
            >
              <h5 className="font-[600] text-[20px] md:text-[24px]">
                Shop Products
              </h5>
            </div>
            <div
              className={`flex items-center ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px] mt-2 md:mt-0`}
              onClick={() => setActive(2)}
            >
              <h5 className="font-[600] text-[20px] md:text-[24px]">
                Running Events
              </h5>
            </div>
            <div
              className={`flex items-center ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px] mt-2 md:mt-0`}
              onClick={() => setActive(3)}
            >
              <h5 className="font-[600] text-[20px] md:text-[24px]">
                Shop Reviews
              </h5>
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            {isOwner && (
              <div>
                <Link to="/dashboard">
                  <div
                    className={`${styles.button} !rounded-[4px] h-[42px] text-[18px] md:text-[20px]`}
                  >
                    <span className="text-white">Go Dashboard</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <br />

        {active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
        )}

        {active === 2 && (
          <div className="w-full">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
              {events &&
                events.map((i, index) => (
                  <ProductCard
                    data={i}
                    key={index}
                    isShop={true}
                    isEvent={true}
                  />
                ))}
            </div>
            {events && events.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px] md:text-[20px]">
                No Events have for this shop!
              </h5>
            )}
          </div>
        )}

        {active === 3 && (
          <div className="w-full">
            {allReviews &&
              allReviews.map((item, index) => (
                <div className="w-full flex my-4">
                  <img
                    src={`${item.user.avatar?.url}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="font-[600] text-[18px] md:text-[20px] pr-2">
                        {item.user.name}
                      </h1>
                      (4/5)
                    </div>
                    <p className="font-[400] text-[#000000a7] text-[16px] md:text-[18px]">
                      {item?.comment}
                    </p>
                    <p className="text-[#000000a7] text-[14px] md:text-[16px]">
                      {"2days ago"}
                    </p>
                  </div>
                </div>
              ))}
            {allReviews && allReviews.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px] md:text-[20px]">
                No Reviews for this shop!
              </h5>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;
