"use client";

import { properties } from "@/constants/dummydata";
import Image from "next/image";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import PushPinIcon from "@mui/icons-material/PushPin";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Modal from "@/components/Modal";

export default function MoreProperties() {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [allProps, setAllProps] = useState([]);

  console.log("allProp", allProps);

  React.useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch(`/api/estate/client`);
        const data = await response.json();
        console.log(data);

        const residential = data.result?.residential || [];
        const commercial = data.result?.commercial || [];

        const combined = [...residential, ...commercial];
        setAllProps(combined);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProperties();
  }, []);

  const renderModal = () => {
    return (
      <Modal
        divStyle={" md:max-h-[80vh] w-full h-[60vh] p-4"}
        onClose={() => setOpenModal(false)}
      >
        <h2 className="hero_subheading">{modal?.title}</h2>
        <h2 className="text-[20px] mb-2">{modal?.description}</h2>
        <ul>
          {modal?.features.map((item, _id) => (
            <li key={_id} className="flex pb-1">
              <PushPinIcon
                className="rotate-45 mr-2 text-bright_red/80"
                fontSize="small"
              />
              <span className="bodyText">{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-4 my-6">
          {modal?.images.map((imgsrc) => (
            <Image
              key={imgsrc}
              src={imgsrc}
              width={400}
              height={300}
              alt="image"
              className="rounded"
            />
          ))}
        </div>
      </Modal>
    );
};

return (
  <section>
    <div className="bg-bright_red pt-[75px]">
      <div
        style={{ backgroundImage: `url('/prop1.png')` }}
        className="w-full h-[320px] bg-prim_black flex  justify-center items-center text-center bg-center bg-cover  bg-no-repeat "
      >
        <h1 className="md:hero_heading hero_heading_Sm text-white">
          View all properties
        </h1>
      </div>
    </div>

    {openModal && renderModal()}

    <div className="flex justify-center  flex-wrap gap-7 my-6 px-4 md:px-28">
      {properties?.map((property) => (
        <div
          onClick={() => {
            setOpenModal(true);
            setModal(property);
          }}
          key={property.id}
          className="rounded-lg p-1 max-w-[400px] overflow-hidden shadow-md"
        >
          <Image
            src={property.images[1]}
            width={800}
            height={400}
            alt="img"
            className="h-[240px] rounded w-full hover:scale-[1.02] transition duration-200 object-cover object-center"
          />
          <p className="text-[20px] leading-tight py-2">{property.title}</p>
          {/* <p className="text-ellipsis ext-nowrap">{property.description}</p> */}

          <div className="flex gap-1">
            <LocationOnIcon fontSize="small" className="text-prim_black/55" />
            <span>GH-4, Lajpat Nagar</span>
          </div>

          <div className="flex gap-1">
            <SquareFootIcon fontSize="small" className="text-prim_black/55" />
            <span>800 X 800 sq</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);
}
