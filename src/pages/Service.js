import React , {useState} from "react";

import CreateService from "../components/CreateService";

function Service() {
    const [service ,addService] = useState();  
    console.log(service);
  
  return (
    <>
      <CreateService addService={addService}/>
    </>
  );
}

export default Service;
