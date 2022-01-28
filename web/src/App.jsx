import React from "react";
import Heading from "./components/Heading";
import Button from "./components/Button"
import Image from "./components/Image";
import google from "./assets/images/google.png";

import logo from "./assets/images/abcd.png"
function App() {
  return (
    <div>
      <div className="Left">
        <Heading className="left-heading" title="TRACK YOUR" />
        <div className="left-image">
          <Image className="" src={logo} />
        </div>
      </div>
      <div className="Right">
        <Heading className="right-heading" title="MENTAL HEALTH" />
        <Button className="button button-google" title= {"Log in with Google"} image={google} />
        <Button className="button button-fb" title="Log in with Facebook" />
      </div>
    </div>
  );
}

export default App;
