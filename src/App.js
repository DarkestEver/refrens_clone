import './App.css';

import { Col, Row } from "antd";

import CreateService from "./components/CreateService";
import Preview from './components/Preview';

function App() {
  return (
    <>

    <Row gutter={[48]}>
      <Col flex={3} style={{ maxWidth: "60%"}}>
        <CreateService />
      </Col>
      <Col flex={2}>
        <Preview />
      </Col>
    </Row>


    </>
  );
}

export default App;
