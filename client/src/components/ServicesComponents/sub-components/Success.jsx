import { Button, Result } from 'antd';

import { Link } from 'react-router-dom';

const Success = () => (
  <Result
    status="success"
    title="🎉 Yay! Your Service is Published."
    subTitle="Share the best of your services and offerings"
    extra={[
        <Link to="/">
      <Button type="primary" key="console">
        Go To Home
      </Button>
        </Link>,
        <Link to="/create-service">
      <Button key="buy">Add a new service</Button>,
        </Link>
    ]}
  />
);

export default Success;