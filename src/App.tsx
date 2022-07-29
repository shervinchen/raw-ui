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
      <h2>{title}</h2>
      {children}
      <style jsx>
        {`
          .wrapper:not(:last-child) {
            margin-bottom: 40px;
          }

          .wrapper h2 {
            margin: 0 0 16px;
          }
        `}
      </style>
    </div>
  );
};

const Unit: FC<
  PropsWithChildren<{ title?: string; layout: 'row' | 'col' }>
> = ({ title, layout, children }) => {
  return (
    <div className="unit">
      {title && <h3>{title}</h3>}
      <div className={`unit-content unit-content-${layout}`}>{children}</div>
      <style jsx>
        {`
          .unit-content {
            display: flex;
            align-items: center;
          }

          .unit:not(:last-child) {
            margin-bottom: 12px;
          }

          .unit h3 {
            margin: 0 0 16px;
          }

          .unit-content-row {
            flex-direction: row;
            column-gap: 32px;
          }

          .unit-content-col {
            flex-direction: column;
            row-gap: 32px;
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
        <Wrapper title="Variant">
          <Unit title="Outline" layout="row">
            <Button type="primary" variant="outline">
              Primary
            </Button>
            <Button type="success" variant="outline">
              Success
            </Button>
            <Button type="warning" variant="outline">
              Warning
            </Button>
            <Button type="error" variant="outline">
              Error
            </Button>
          </Unit>
          <Unit title="Ghost" layout="row">
            <Button variant="ghost">Default</Button>
            <Button type="primary" variant="ghost">
              Primary
            </Button>
            <Button type="success" variant="ghost">
              Success
            </Button>
            <Button type="warning" variant="ghost">
              Warning
            </Button>
            <Button type="error" variant="ghost">
              Error
            </Button>
          </Unit>
          <Unit title="Shadow" layout="row">
            <Button variant="shadow">Default</Button>
            <Button type="primary" variant="shadow">
              Primary
            </Button>
            <Button type="success" variant="shadow">
              Success
            </Button>
            <Button type="warning" variant="shadow">
              Warning
            </Button>
            <Button type="error" variant="shadow">
              Error
            </Button>
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled">
          <Unit layout="row">
            <Button disabled>Disabled</Button>
          </Unit>
        </Wrapper>
      </Container>
    </div>
  );
}

export default App;
