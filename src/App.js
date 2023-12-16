import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Payment from "./components/payment/Payment.tsx";
import Verification from "./components/verification/Verification.tsx";
import SuccessVerification from "./components/verification/SuccessVerification.tsx";
import FailVerification from "./components/verification/FailVerification.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="verification" element={<Verification />} />
        <Route path="success" element={<SuccessVerification />} />
        <Route path="fail" element={<FailVerification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
