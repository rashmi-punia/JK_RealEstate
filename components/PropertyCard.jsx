"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PropertyCard = ({ property }) => {
	
  const [index, setIndex] = useState(0);

 useEffect(() => {
   if (!property?.images || property.images.length === 0) return;

   const interval = setInterval(() => {
     setIndex((prevIndex) => (prevIndex + 1) % property.images.length);
   }, 6000);

   return () => clearInterval(interval);
 }, [property?.images]);


  useGSAP(() => {
    gsap.utils.toArray(".right_imgclass").forEach((el) => {
      gsap.fromTo(
        el,
        {
          x: -200,
          opacity: 0,
          y: 10,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
          },
        }
      );
    });
    gsap.utils.toArray(".left_imgclass").forEach((el) => {
      gsap.fromTo(
        el,
        {
          x: 200,
          opacity: 0,
          y: 10,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
          },
        }
      );
    });
  }, []);

  return (
    <div
      key={property.id}
      className={`
        relative md:py-16 py-12 px-4 text-start`}
      // className={`${ property.id % 2 !== 0 ? "md:flex-row" : "md:flex-row-reverse"} 
      //   relative md:flex-center  flex flex-col gap-6 md:py-16 py-12 px-4  md:gap-28`}
    >
      {/* LEFT */}
      <div
        className={`${
          property.id % 2 !== 0 ? "right_imgclass" : "left_imgclass"
        } relative group w-fit  `}
      >
        <Image
          src={property.images[index]?.url}
          width={545}
          height={340}
          alt="propertyImg"
          className={` ${
            property.id % 2 !== 0 ? "md:-rotate-" : "md:rotate-"
          } md:w-[545px] md:h-[350px] object-cover object-center transition-all delay-200 `}
        />

        <div className="flex justify-center gap-2">
          {property.images.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setIndex(idx)}
              className={`${
                idx === index ? "bg-prim_black/90" : "bg-gray/50"
              } transition-all duration-150 w-3 h-3 rounded-full inline-block my-3`}
            />
          ))}
        </div>

        <div
          className={`${
            property.id % 2 !== 0
              ? "md:-left-8 -left-3  rotate-12"
              : " md:-right-12 -right-3 -rotate-12"
          } absolute group-hover:rotate-45 duration-200 delay-75 ease-in-out bg-bright_red rounded-full md:p-1.5 p-1 md:-top-5 -top-3 `}
        >
          <Image
            src={"/triangle.svg"}
            width={70}
            height={72}
            alt="svg"
            className="md:w-[50px] w-[30px] "
          />
        </div>

      </div>
      {/* RIGHT */}
      <div
        className={` ${
          property.id % 2 !== 0 ? "left_imgclass" : "right_imgclass"
        } max-w-[700px] `}
      >
        <h2 className="md:text-[34px] text-[28px] leading-snug md:leading-normal font-[550] text-[#003A47]">
          {property.location}
        </h2>
        <h3 className="font-medium md:text-[28px] text-[23px] leading-tight m:leading-normal md:tracking-[0.5px] text-[#234E70]">
          {property.size} sq. foot
        </h3>
        <h3 className="font-medium capitalize md:text-[28px] text-[23px] leading-tight m:leading-normal md:tracking-[0.5px] text-[#234E70]">
          For {property.status.toLowerCase()}
        </h3>
        {/* <ul className="list-disc list-outside pl-5 md:bodyText pt-2 space-y-1 text-[#003A47]">
					{property.features.map((feature, i) => (
						<li key={i}>{feature}</li>
					))}
				</ul> */}
      </div>
    </div>
  );
};

export default PropertyCard;
