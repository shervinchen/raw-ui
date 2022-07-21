import React, { FC, PropsWithChildren } from 'react';
import { Button } from '../components';

const Container: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className="container">
      <h1>{title}</h1>
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

          .container h1 {
            margin: 0 0 20px;
          }
        `}
      </style>
    </div>
  );
};

const Wrapper: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className="wrapper">
      <h3>{title}</h3>
      {children}
      <style jsx>
        {`
          .wrapper:not(:last-child) {
            margin-bottom: 40px;
          }

          .wrapper h3 {
            margin: 0 0 16px;
          }
        `}
      </style>
    </div>
  );
};

const Unit: FC<PropsWithChildren<{ layout: 'row' | 'col' }>> = ({
  layout,
  children,
}) => {
  return (
    <div className={`unit unit-${layout}`}>
      {children}
      <style jsx>
        {`
          .unit {
            display: flex;
            align-items: center;
          }

          .unit:not(:last-child) {
            margin-bottom: 12px;
          }

          .unit-row {
            flex-direction: row;
            column-gap: 16px;
          }

          .unit-col {
            flex-direction: column;
            row-gap: 16px;
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
        <Wrapper title="Types">
          <Unit layout="row">
            <Button>Default</Button>
            <Button type="primary">Primary</Button>
            <Button type="success">Success</Button>
            <Button type="warning">Warning</Button>
            <Button type="error">Error</Button>
          </Unit>
        </Wrapper>
        <Wrapper title="Sizes">
          <Unit layout="row">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </Unit>
        </Wrapper>
      </Container>
    </div>
  );
}

export default App;
