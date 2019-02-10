import React from 'react';

import { Menu, MenuItem, MenuGroup } from '@jay.wang/fundamental-react';
import { DocsTile, DocsText, Separator, Header, Description, Import, Properties } from '../documentation';

export const MenuComponent = () => {
  const menuCode = ` <Menu>
  <MenuItem key="1">Option 1</MenuItem>
  <MenuItem key="2">Option 2</MenuItem>
  <MenuItem key="3">Option 3</MenuItem>
  <MenuItem key="4">Option 4</MenuItem>
</Menu>`;

  const menuGroupCode = `  <Menu>
  <MenuItem key="1">Option 1</MenuItem>
  <MenuItem key="2">Option 2</MenuItem>
  <MenuItem key="3">Option 3</MenuItem>

  <MenuGroup title="Group Header">
    <MenuItem key="7">Option 4</MenuItem>
    <MenuItem key="8">Option 5</MenuItem>
    <MenuItem key="9">Option 6</MenuItem>
  </MenuGroup>

  <MenuItem key="4">Option 7</MenuItem>
  <MenuItem key="5">Option 8</MenuItem>
  <MenuItem key="6">Option 9</MenuItem>
</Menu>`;

  const menuSeparatorCode = ` <Menu>
  <MenuItem key="1" separator>
    Option 1
  </MenuItem>
  <MenuItem key="2" separator>
    Option 2
  </MenuItem>
  <MenuItem key="3" separator>
    Option 3
  </MenuItem>
  <MenuItem key="4">Option 4</MenuItem>
</Menu>`;

  const menuAddonBeforeCode = ` <Menu>
  <MenuItem key="1">Option 1</MenuItem>
  <MenuItem key="2" addon="accept">
    Option 2
  </MenuItem>
  <MenuItem key="3">Option 3</MenuItem>
  <MenuItem key="4">Option 4</MenuItem>
</Menu>`;

  return (
    <div>
      <Header>Menu</Header>
      <Description>
        The menu component is the listing structure with optional headers to create menus. Commonly used as the contents when composing “dropdowns”, “contextual menus”, “mega
        menu”, etc, when paired with the popover component.
      </Description>
      <Import module="Menu, MenuItem, MenuGroup" path="/fundamental-react/src/" />

      <Separator />

      <Properties
        type="Inputs"
        properties={[
          { name: 'url', description: "string - href attribute of <a> tag. Use either 'url' or 'link'" },
          { name: 'link', description: "string - a router link. Use either 'url' or 'link'" },
          { name: 'separator', description: 'bool - when set to true, adds a horizontal line (separator).' },
          {
            name: 'title',
            description: 'string - group header title.'
          },
          {
            name: 'addon',
            description: 'string - the name of the SAP icon to be applied as an addon before.'
          }
        ]}
      />

      <Separator />

      <h2>Menu</h2>
      <p>The basic stucture of a menu.</p>
      <DocsTile>
        <Menu>
          <MenuItem key="1">Option 1</MenuItem>
          <MenuItem key="2">Option 2</MenuItem>
          <MenuItem key="3">Option 3</MenuItem>
          <MenuItem key="4">Option 4</MenuItem>
        </Menu>
      </DocsTile>
      <DocsText>{menuCode}</DocsText>
      <Separator />

      <h2>Menu w/ Group</h2>
      <p>Menu with grouped sub-menus and group headers.</p>
      <DocsTile>
        <Menu>
          <MenuItem key="1">Option 1</MenuItem>
          <MenuItem key="2">Option 2</MenuItem>
          <MenuItem key="3">Option 3</MenuItem>

          <MenuGroup title="Group Header">
            <MenuItem key="7">Option 4</MenuItem>
            <MenuItem key="8">Option 5</MenuItem>
            <MenuItem key="9">Option 6</MenuItem>
          </MenuGroup>

          <MenuItem key="4">Option 7</MenuItem>
          <MenuItem key="5">Option 8</MenuItem>
          <MenuItem key="6">Option 9</MenuItem>
        </Menu>
      </DocsTile>
      <DocsText>{menuGroupCode}</DocsText>
      <Separator />

      <h2>Menu w/ Separator</h2>
      <p>Menu items with horizontal line as separator.</p>
      <DocsTile>
        <Menu>
          <MenuItem key="1" separator>
            Option 1
          </MenuItem>
          <MenuItem key="2" separator>
            Option 2
          </MenuItem>
          <MenuItem key="3" separator>
            Option 3
          </MenuItem>
          <MenuItem key="4">Option 4</MenuItem>
        </Menu>
      </DocsTile>
      <DocsText>{menuSeparatorCode}</DocsText>
      <Separator />

      <h2>Menu w/ Default Selection</h2>
      <p>Menu items with Default Selection.</p>
      <DocsTile>
        <Menu defaultSelectedKeys={['1']}>
          <MenuItem key="1">Option 1</MenuItem>
          <MenuItem key="2" addon="accept">
            Option 2
          </MenuItem>
          <MenuItem key="3">Option 3</MenuItem>
          <MenuItem key="4">Option 4</MenuItem>
        </Menu>
      </DocsTile>
      <DocsText>{menuAddonBeforeCode}</DocsText>
      <Separator />
    </div>
  );
};
