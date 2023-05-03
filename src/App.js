import './App.css';

import CreateService from "./components/CreateService";
import Preview from './components/Preview';

function App() {
  return (
    <>
    <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"flex-start", margin:"1rem 5rem"}}>

      <CreateService />
      <Preview />

    </div>
    </>
  );
}

export default App;
