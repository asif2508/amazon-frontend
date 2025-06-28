"use client";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function Banner() {
  return (
    <div className="max-w-[1240px] mx-auto">
      <Carousel>
        <div>
          <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <p className="legend">Buy Headphones in offer</p>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <p className="legend">Buy beautiful shoes</p>
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
