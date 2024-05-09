import React, { FC, PropsWithChildren } from 'react';
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
import {
  DemoRadioChecked,
  DemoRadioControlled,
  DemoRadioDefault,
  DemoRadioDisabled,
  DemoRadioGroup,
  DemoRadioWithLabel,
} from './radio';
import {
  DemoSelectControlled,
  DemoSelectDefault,
  DemoSelectDisabled,
  DemoSelectDisabledOption,
  DemoSelectMultiple,
  DemoSelectSelected,
  DemoSelectSetParentElement,
} from './select';
import {
  DemoToggleChecked,
  DemoToggleControlled,
  DemoToggleDefault,
  DemoToggleDisabled,
} from './toggle';
import { DemoLoadingSizes, DemoLoadingText, DemoLoadingTypes } from './loading';
import {
  DemoTooltipDefault,
  DemoTooltipDisabled,
  DemoTooltipHideArrow,
  DemoTooltipPlacement,
} from './tooltip';
import {
  DemoPopoverControlled,
  DemoPopoverDefault,
  DemoPopoverDisabled,
  DemoPopoverHideArrow,
  DemoPopoverPlacement,
} from './popover';
import {
  DemoModalDefault,
  DemoModalNotCloseOnOverlayClick,
  DemoModalWidth,
} from './modal';
import { DemoPaginationDefault } from './pagination';

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
        <Wrapper title="Types">
          <DemoLoadingTypes />
        </Wrapper>
        <Wrapper title="Sizes">
          <DemoLoadingSizes />
        </Wrapper>
        <Wrapper title="With Text">
          <DemoLoadingText />
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
          <DemoSelectDefault />
        </Wrapper>
        <Wrapper title="Selected">
          <DemoSelectSelected />
        </Wrapper>
        <Wrapper title="Controlled">
          <DemoSelectControlled />
        </Wrapper>
        <Wrapper title="Multiple">
          <DemoSelectMultiple />
        </Wrapper>
        <Wrapper title="Disabled Select">
          <DemoSelectDisabled />
        </Wrapper>
        <Wrapper title="Disabled Option">
          <DemoSelectDisabledOption />
        </Wrapper>
        <Wrapper title="Set Parent Element">
          <DemoSelectSetParentElement />
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
          <DemoRadioDefault />
        </Wrapper>
        <Wrapper title="Checked">
          <DemoRadioChecked />
        </Wrapper>
        <Wrapper title="With Label">
          <DemoRadioWithLabel />
        </Wrapper>
        <Wrapper title="Controlled">
          <DemoRadioControlled />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoRadioDisabled />
        </Wrapper>
        <Wrapper title="Group">
          <DemoRadioGroup />
        </Wrapper>
      </Container>
      <Container title="Toggle">
        <Wrapper title="Default">
          <DemoToggleDefault />
        </Wrapper>
        <Wrapper title="Checked">
          <DemoToggleChecked />
        </Wrapper>
        <Wrapper title="Controlled">
          <DemoToggleControlled />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoToggleDisabled />
        </Wrapper>
      </Container>
      <Container title="Tooltip">
        <Wrapper title="Default">
          <DemoTooltipDefault />
        </Wrapper>
        <Wrapper title="Hide Arrow">
          <DemoTooltipHideArrow />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoTooltipDisabled />
        </Wrapper>
        <Wrapper title="Placement">
          <DemoTooltipPlacement />
        </Wrapper>
      </Container>
      <Container title="Popover">
        <Wrapper title="Default">
          <DemoPopoverDefault />
        </Wrapper>
        <Wrapper title="Hide Arrow">
          <DemoPopoverHideArrow />
        </Wrapper>
        <Wrapper title="Disabled">
          <DemoPopoverDisabled />
        </Wrapper>
        <Wrapper title="Placement">
          <DemoPopoverPlacement />
        </Wrapper>
        <Wrapper title="Controlled">
          <DemoPopoverControlled />
        </Wrapper>
      </Container>
      <Container title="Modal">
        <Wrapper title="Default">
          <DemoModalDefault />
        </Wrapper>
        <Wrapper title="Not Close On Overlay Click">
          <DemoModalNotCloseOnOverlayClick />
        </Wrapper>
        <Wrapper title="Width">
          <DemoModalWidth />
        </Wrapper>
      </Container>
      <Container title="Pagination">
        <Wrapper title="Default">
          <DemoPaginationDefault />
        </Wrapper>
      </Container>
    </div>
  );
}

export default App;
