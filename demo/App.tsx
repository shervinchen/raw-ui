import React, { FC, PropsWithChildren, ChangeEvent, useState } from 'react';
import {
  Loading,
  Input,
  Radio,
  RadioValue,
  Toggle,
  Select,
  SelectValue,
} from '../packages';
import Unit from './Unit';
import Wrapper from './Wrapper';
import {
  DemoCheckboxChecked,
  DemoCheckboxControlled,
  DemoCheckboxDefault,
  DemoCheckboxDisabled,
  DemoCheckboxGroup,
  DemoCheckboxGroupWithIndeterminate,
  DemoCheckboxIndeterminate,
  DemoCheckboxWithLabel,
} from './checkbox';
import {
  DemoButtonDisabled,
  DemoButtonIcon,
  DemoButtonLoading,
  DemoButtonSizes,
  DemoButtonTypes,
  DemoButtonVariantGhost,
  DemoButtonVariantOutline,
  DemoButtonVariantShadow,
} from './button';
import {
  DemoButtonGroupDisabled,
  DemoButtonGroupSizes,
  DemoButtonGroupTypes,
  DemoButtonGroupVariantGhost,
  DemoButtonGroupVariantOutline,
  DemoButtonGroupVertical,
} from './button-group';
import {
  DemoInputAddon,
  DemoInputClearable,
  DemoInputControlled,
  DemoInputDefaultValue,
  DemoInputDisabled,
  DemoInputInsideElement,
  DemoInputPassword,
  DemoInputReadOnly,
  DemoInputSizes,
  DemoInputTypes,
  DemoInputWidth,
} from './input';

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

function App() {
  const [controllableRadioValue, setControllableRadioValue] = useState(false);
  const [controllableRadioGroupValue, setControllableRadioGroupValue] =
    useState<RadioValue>('angular');
  const [controllableToggleValue, setControllableToggleValue] = useState(false);
  const [controllableSelectValue, setControllableSelectValue] =
    useState<SelectValue>();

  const optionsData = [
    {
      name: 'React',
      value: 'react',
    },
    {
      name: 'Vue',
      value: 'vue',
    },
    {
      name: 'Angular',
      value: 'angular',
    },
    {
      name: 'Svelte',
      value: 'svelte',
    },
  ];

  return (
    <div>
      <Container title="Button">
        <Wrapper title="Types">
          <DemoButtonTypes />
        </Wrapper>
        <Wrapper title="Sizes">
          <DemoButtonSizes />
        </Wrapper>
        <Wrapper title="Variant">
          <DemoButtonVariantOutline title="Outline" />
          <DemoButtonVariantGhost title="Ghost" />
          <DemoButtonVariantShadow title="Shadow" />
        </Wrapper>
        <Wrapper title="Loading">
          <DemoButtonLoading />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoButtonDisabled />
        </Wrapper>
        <Wrapper title="Icons">
          <DemoButtonIcon />
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
          <DemoButtonGroupTypes />
        </Wrapper>
        <Wrapper title="Variant">
          <DemoButtonGroupVariantOutline title="Outline" />
          <DemoButtonGroupVariantGhost title="Ghost" />
        </Wrapper>
        <Wrapper title="Size">
          <DemoButtonGroupSizes />
        </Wrapper>
        <Wrapper title="Vertical">
          <DemoButtonGroupVertical />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoButtonGroupDisabled />
        </Wrapper>
      </Container>
      <Container title="Input">
        <Wrapper title="Types">
          <DemoInputTypes />
        </Wrapper>
        <Wrapper title="Sizes">
          <DemoInputSizes />
        </Wrapper>
        <Wrapper title="Width">
          <DemoInputWidth />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoInputDisabled />
        </Wrapper>
        <Wrapper title="Read Only">
          <DemoInputReadOnly />
        </Wrapper>
        <Wrapper title="Default Value">
          <DemoInputDefaultValue />
        </Wrapper>
        <Wrapper title="Controlled Input">
          <DemoInputControlled />
        </Wrapper>
        <Wrapper title="Inside Element">
          <DemoInputInsideElement />
        </Wrapper>
        <Wrapper title="Addon">
          <DemoInputAddon />
        </Wrapper>
        <Wrapper title="Password">
          <DemoInputPassword />
        </Wrapper>
        <Wrapper title="Clearable">
          <DemoInputClearable />
        </Wrapper>
      </Container>
      <Container title="Select">
        <Wrapper title="Default">
          <Unit layout="row">
            <Select width="200px" placeholder="Select option">
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
            </Select>
          </Unit>
        </Wrapper>
        <Wrapper title="Selected">
          <Unit layout="row">
            <Select
              width="200px"
              placeholder="Select option"
              defaultValue={'1'}
            >
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
            </Select>
          </Unit>
        </Wrapper>
        <Wrapper title="Controlled">
          <Unit layout="row">
            <Select
              width="200px"
              placeholder="Select option"
              value={controllableSelectValue}
              onChange={(value) => {
                setControllableSelectValue(value);
              }}
            >
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
            </Select>
          </Unit>
        </Wrapper>
        <Wrapper title="Multiple">
          <Unit layout="row">
            <Select
              width="200px"
              placeholder="Select option"
              multiple
              defaultValue={['react', 'vue']}
            >
              {optionsData.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled Select">
          <Unit layout="row">
            <Select width="200px" placeholder="Select option" disabled>
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
            </Select>
            <Select
              width="200px"
              placeholder="Select option"
              disabled
              multiple
              defaultValue={['react', 'vue']}
            >
              {optionsData.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled Option">
          <Unit layout="row">
            <Select width="200px" placeholder="Select option">
              <Select.Option value="1" disabled>
                Option 1
              </Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
            </Select>
          </Unit>
        </Wrapper>
        <Wrapper title="Set Parent Element">
          <Unit layout="row">
            <div
              id="parentElement"
              style={{
                position: 'relative',
                overflowY: 'auto',
                width: '400px',
                height: '200px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '400px',
                }}
              >
                <Select
                  width="200px"
                  placeholder="Select option"
                  getPopupContainer={() =>
                    document.querySelector('#parentElement')
                  }
                >
                  <Select.Option value="1">Option 1</Select.Option>
                  <Select.Option value="2">Option 2</Select.Option>
                </Select>
              </div>
            </div>
          </Unit>
        </Wrapper>
      </Container>
      <Container title="Checkbox">
        <Wrapper title="Default">
          <DemoCheckboxDefault />
        </Wrapper>
        <Wrapper title="Checked">
          <DemoCheckboxChecked />
        </Wrapper>
        <Wrapper title="With Label">
          <DemoCheckboxWithLabel />
        </Wrapper>
        <Wrapper title="Controlled">
          <DemoCheckboxControlled />
        </Wrapper>
        <Wrapper title="Indeterminate">
          <DemoCheckboxIndeterminate />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoCheckboxDisabled />
        </Wrapper>
        <Wrapper title="Group">
          <DemoCheckboxGroup />
        </Wrapper>
        <Wrapper title="Indeterminate with Group">
          <DemoCheckboxGroupWithIndeterminate />
        </Wrapper>
      </Container>
      <Container title="Radio">
        <Wrapper title="Default">
          <Unit layout="row">
            <Radio />
          </Unit>
        </Wrapper>
        <Wrapper title="Checked">
          <Unit layout="row">
            <Radio defaultChecked />
          </Unit>
        </Wrapper>
        <Wrapper title="With Label">
          <Unit layout="row">
            <Radio>Label</Radio>
          </Unit>
        </Wrapper>
        <Wrapper title="Controlled">
          <Unit layout="row">
            <Radio
              checked={controllableRadioValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setControllableRadioValue(event.target.checked);
              }}
            >
              Controlled
            </Radio>
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled">
          <Unit layout="row">
            <Radio disabled>Disabled</Radio>
            <Radio defaultChecked disabled>
              Disabled
            </Radio>
          </Unit>
        </Wrapper>
        <Wrapper title="Group">
          <Unit layout="col">
            <Radio.Group defaultValue="vue">
              {optionsData.map((item) => (
                <Radio value={item.value} key={item.value}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
            <Radio.Group
              value={controllableRadioGroupValue}
              onChange={(groupValue) => {
                setControllableRadioGroupValue(groupValue);
              }}
            >
              {optionsData.map((item) => (
                <Radio value={item.value} key={item.value}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
            <Radio.Group defaultValue="svelte" disabled>
              {optionsData.map((item) => (
                <Radio value={item.value} key={item.value}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
            <Radio.Group defaultValue="vue" layout="column">
              {optionsData.map((item) => (
                <Radio value={item.value} key={item.value}>
                  {item.name}
                </Radio>
              ))}
            </Radio.Group>
          </Unit>
        </Wrapper>
      </Container>
      <Container title="Toggle">
        <Wrapper title="Default">
          <Unit layout="row">
            <Toggle />
          </Unit>
        </Wrapper>
        <Wrapper title="Checked">
          <Unit layout="row">
            <Toggle defaultChecked />
          </Unit>
        </Wrapper>
        <Wrapper title="Controlled">
          <Unit layout="row">
            <Toggle
              checked={controllableToggleValue}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setControllableToggleValue(event.target.checked);
              }}
            />
          </Unit>
        </Wrapper>
        <Wrapper title="Disabled">
          <Unit layout="row">
            <Toggle disabled />
            <Toggle defaultChecked disabled />
          </Unit>
        </Wrapper>
      </Container>
    </div>
  );
}

export default App;
