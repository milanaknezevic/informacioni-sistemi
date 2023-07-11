import React, { useState } from "react";
import Modal from "react-modal";
import PieChartComponent from "../../../components/pie/pie";
import "./details.scss";
type DetailsProps = {
  closeModal: () => void;
  troskovi: boolean;
  isModalOpen: boolean;
  value: any[]; // Dodajte tip za incomeData
  naslov: string;
};

const Details: React.FC<DetailsProps> = ({
  closeModal,
  isModalOpen,
  value,
  naslov,
  troskovi,
}) => {
  console.log("details grupisane narudzbe ", value);
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      shouldCloseOnOverlayClick={false} // Onemogućava zatvaranje moda klikom izvan njega
      style={{
        content: {
          minWidth: "900px", // Postavite željenu širinu moda
          height: "600px", // Postavite željenu visinu moda
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Prilagodite stil overlaya prema potrebama
        },
      }}
    >
      <button
        onClick={closeModal}
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        X
      </button>
      {isModalOpen && (
        <div className="container">
          <h2 style={{ top: 10 }}>{naslov}</h2>
          <PieChartComponent data={value} troskovi={troskovi} />
        </div>
      )}
    </Modal>
  );
};

export default Details;
