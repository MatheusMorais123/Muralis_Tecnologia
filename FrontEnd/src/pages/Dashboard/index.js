import React from "react";
import "./styles.css";
import Navbar from "../../components/NavBar";
import Graph from "../../components/Graficos/Bar";
import Line from "../../components/Graficos/Line";
import Box from "../../components/box"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNavicon, faUsers, faEnvelope } from '@fortawesome/free-solid-svg-icons';
export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex-header">
        <div className="text">Controle Geral</div>
        <div className="text"><FontAwesomeIcon icon={faNavicon} /></div>
      </div>
      <div className="container">
        <Box />
        <Graph />
        <Line />
      </div>
    </>
  );
}
