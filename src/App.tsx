import React, { FC, PropsWithChildren, ChangeEvent, useState } from "react";
import { Search, AlertCircle, Eye, EyeOff } from "react-feather";
import { Button, Loading, ButtonGroup, Input, InputGroup, InputLeftElement, InputRightElement, InputLeftAddon, InputRightAddon } from "../components";

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
            padding: 32px;
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
  PropsWithChildren<{ title?: string; layout: "row" | "col" }>
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
            align-items: normal;
          }
        `}
      </style>
    </div>
  );
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
        <Wrapper title="Loading">
          <Unit layout="row">
            <Button loading>Default</Button>
            <Button type="primary" loading>
              Primary
            </Button>
            <Button type="success" variant="outline" loading>
              Success
            </Button>
            <Button type="warning" variant="ghost" loading>
              Warning
            </Button>
            <Button type="error" variant="shadow" loading>
              Error
            </Button>
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled">
          <Unit layout="row">
            <Button disabled>Default</Button>
            <Button type="primary" disabled>
              Primary
            </Button>
            <Button type="primary" variant="outline" disabled>
              Outline
            </Button>
            <Button type="primary" variant="ghost" disabled>
              Ghost
            </Button>
            <Button type="primary" variant="shadow" disabled>
              Shadow
            </Button>
          </Unit>
        </Wrapper>
        <Wrapper title="Icons">
          <Unit layout="row">
            <Button icon={<Search />} />
            <Button icon={<Search />}>Search</Button>
            <Button iconRight={<Search />}>Search</Button>
            <Button type="primary" icon={<Search />} />
            <Button type="primary" icon={<Search />}>
              Search
            </Button>
          </Unit>
        </Wrapper>
      </Container>
      <Container title="Loading">
        <Wrapper title="Type">
          <Unit layout="row">
            <Loading />
            <Loading type="spin" />
          </Unit>
        </Wrapper>
        <Wrapper title="Size">
          <Unit layout="row">
            <Loading size={4} />
            <Loading size={6} />
            <Loading size={8} />
          </Unit>
          <Unit layout="row">
            <Loading type="spin" size={16} />
            <Loading type="spin" size={20} />
            <Loading type="spin" size={32} />
          </Unit>
        </Wrapper>
        <Wrapper title="Text">
          <Unit layout="row">
            <Loading>Loading</Loading>
            <Loading type="spin">Loading</Loading>
          </Unit>
        </Wrapper>
      </Container>
      <Container title="Button Group">
        <Wrapper title="Types">
          <Unit layout="row">
            <ButtonGroup>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup type="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup type="success">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Unit>
        </Wrapper>
        <Wrapper title="Variant">
          <Unit layout="row">
            <ButtonGroup type="primary" variant="outline">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup type="success" variant="outline">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Unit>
        </Wrapper>
        <Wrapper title="Size">
          <Unit layout="row">
            <ButtonGroup size="sm">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup size="md">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup size="lg">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Unit>
        </Wrapper>
        <Wrapper title="Vertical">
          <Unit layout="row">
            <ButtonGroup vertical>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled">
          <Unit layout="row">
            <ButtonGroup disabled>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Unit>
        </Wrapper>
      </Container>
      <Container title="Input">
        <Wrapper title="Types">
          <Unit layout="col">
            <Input placeholder="Default Type" />
            <Input type="primary" placeholder="Primary Type" />
            <Input type="success" placeholder="Success Type" />
            <Input type="warning" placeholder="Warning Type" />
            <Input type="error" placeholder="Error Type" />
          </Unit>
        </Wrapper>
        <Wrapper title="Sizes">
          <Unit layout="row">
            <Input size="sm" placeholder="Small" />
            <Input placeholder="Medium" />
            <Input size="lg" placeholder="Large" />
          </Unit>
        </Wrapper>
        <Wrapper title="Width">
          <Unit layout="row">
            <Input width="160px" placeholder="Customized width" />
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled">
          <Unit layout="col">
            <Input placeholder="Disabled with placeholder" disabled />
            <Input defaultValue="Disabled with value" disabled />
          </Unit>
        </Wrapper>
        <Wrapper title="Read Only">
          <Unit layout="col">
            <Input defaultValue="Read only with value" readOnly />
          </Unit>
        </Wrapper>
        <Wrapper title="Default Value">
          <Unit layout="col">
            <Input defaultValue="default value" placeholder="Placeholder..." />
          </Unit>
        </Wrapper>
        <Wrapper title="Controlled Input">
          <Unit layout="col">
            <Input
              value={inputValue}
              onChange={handleChangeInput}
              placeholder="Placeholder..."
            />
          </Unit>
        </Wrapper>
        <Wrapper title="Inside Element">
          <Unit layout="row">
            <InputGroup>
              <InputLeftElement>
                <Search size={16} />
              </InputLeftElement>
              <Input placeholder="Inside left element" />
            </InputGroup>
            <InputGroup>
              <Input placeholder="Inside right element" />
              <InputRightElement>
                <AlertCircle size={16} />
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <InputLeftElement>$</InputLeftElement>
              <Input placeholder="Enter amount" />
              <InputRightElement>.0</InputRightElement>
            </InputGroup>
          </Unit>
        </Wrapper>
        <Wrapper title="Addon">
          <Unit layout="row">
            <InputGroup>
              <InputLeftAddon>
                username
              </InputLeftAddon>
              <Input placeholder="Put in the username" />
            </InputGroup>
            <InputGroup>
              <Input placeholder="https://github" />
              <InputRightAddon>
                .com
              </InputRightAddon>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon>
                https://
              </InputLeftAddon>
              <Input placeholder="your domain" />
              <InputRightAddon>
                .com
              </InputRightAddon>
            </InputGroup>
          </Unit>
        </Wrapper>
        <Wrapper title="Password">
          <Unit layout="row">
            <InputGroup>
              <Input htmlType={passwordVisible ? 'text' : 'password'} placeholder="Enter password" />
              <InputRightElement clickable onClick={() => setPasswordVisible(!passwordVisible)}>
                { passwordVisible ? <EyeOff size={16} /> : <Eye size={16} /> }
              </InputRightElement>
            </InputGroup>
          </Unit>
        </Wrapper>
      </Container>
    </div>
  );
}

export default App;
