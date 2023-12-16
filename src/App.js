import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Payment from "./components/payment/Payment.tsx";
import Verification from "./components/verification/Verification.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="verification" element={<Verification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
