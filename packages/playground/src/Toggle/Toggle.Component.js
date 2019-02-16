import React from 'react';
import { Toggle } from '@jay.wang/fundamental-react';
import { DocsTile, DocsText, Separator, Header, Description, Import, Properties } from '../documentation';

export const ToggleComponent = () => {
  const toggleCode = `  <Toggle size="xs">Extra Small toggle</Toggle>
  <Toggle size="s" defaultChecked>
    Small toggle
  </Toggle>
  <Toggle>Normal toggle</Toggle>
  <Toggle size="l" defaultChecked>
    Large toggle
  </Toggle>`;

  const toggleDisabledCode = ` <Toggle size="xs" disabled>
  Extra Small toggle
</Toggle>
<Toggle size="s" defaultChecked disabled>
  Small toggle
</Toggle>
<Toggle disabled>Normal toggle</Toggle>
<Toggle size="l" defaultChecked disabled>
  Large toggle
</Toggle>`;

  return (
    <div>
      <Header>Toggle</Header>
      <Description>
        The toggle component is used to activate or deactivate an element. Uses a visual metaphor that is know to the user with visible differences between on and off state. It is
        recommended to always display the toggle with a label above it as well as the label of the selected state. For example, the label above would be Active, the toggle state
        would be “on” and the selected state label displayed to the right of the toggle would be “Yes”.
      </Description>
      <Import module="Toggle" path="/fundamental-react/src/" />

      <Separator />

      <Properties type="Inputs" properties={[{ name: 'size', description: 'string - The size of the toggle.' }, { name: 'id', description: 'string - The id of the toggle.' }]} />

      <Separator />

      <h2>Toggle Sizes</h2>
      <Description>
        The toggle can be set to 4 sizes: 'xs', 's', 'normal' and 'l'. For 'normal' size leave empty. <br />
        When used with forms, it is recommended to use the small size so that form components will be consistent.
      </Description>
      <DocsTile>
        <Toggle size="xs">Extra Small toggle</Toggle>
        <Toggle size="s" defaultChecked>
          Small toggle
        </Toggle>
        <Toggle>Normal toggle</Toggle>
        <Toggle size="l" defaultChecked>
          Large toggle
        </Toggle>
      </DocsTile>
      <DocsText>{toggleCode}</DocsText>

      <Separator />

      <h2>Disabled state</h2>
      <Description>The toggle can be set to the disable state and still indicate the state of the toggle. To do this, add the 'disabled' parameter to the element.</Description>
      <DocsTile>
        <Toggle size="xs" disabled>
          Extra Small toggle
        </Toggle>
        <Toggle size="s" defaultChecked disabled>
          Small toggle
        </Toggle>
        <Toggle disabled>Normal toggle</Toggle>
        <Toggle size="l" defaultChecked disabled>
          Large toggle
        </Toggle>
      </DocsTile>
      <DocsText>{toggleDisabledCode}</DocsText>

      <Separator />
    </div>
  );
};
