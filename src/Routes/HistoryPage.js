import React from "react";
import History from "../Components/History";
import HistoryHelper from "../Components/HistoryHelper";
import NavBar from "../Components/NavBar";

function HistoryPage() {
  return (
    <>
      <NavBar />
      {localStorage.getItem("UserType") === "Customer" ? (
        <History />
      ) : (
        <HistoryHelper />
      )}
    </>
  );
}

export default HistoryPage;
