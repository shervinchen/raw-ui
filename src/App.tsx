import React, { FC, PropsWithChildren } from 'react';
import { Button } from '../components';

const Container: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
      <style jsx>
        {`
          .container {
            max-width: 800px;
            margin: 30px auto;
            border-radius: 4px;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
            padding: 16px;
          }

          .container h2 {
            margin: 0 0 20px;
          }
        `}
      </style>
    </div>
  );
};

function App() {
  return (
    <div>
      <Container title="Button">
        <Button text="button" type="primary" />
      </Container>
    </div>
  );
}

export default App;
