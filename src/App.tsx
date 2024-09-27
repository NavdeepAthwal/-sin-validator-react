import React from "react";
import SINValidator from "./components/SINValidator";

const App: React.FC = () => {
  return (
    <div className="container">
      <h1>SIN Validator</h1>
      <SINValidator />
    </div>
  );
};

export default App;
