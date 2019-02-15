import React from 'react';
import { Tabs, TabEntry } from '@jay.wang/fundamental-react';
import { DocsTile, DocsText, Separator, Header, Description, Import, Properties, Playground } from '../documentation';

export const TabsComponent = () => {
  const tabscomponentCode = `
    <Tabs>
        <TabEntry key="1" tab="tab1">
            {'Hello World1'}
        </TabEntry>
        <TabEntry key="2" tab="tab2">
            {<span>Hello World2</span>}
        </TabEntry>
        <TabEntry key="3" tab="tab3">
            {'Hello World3'}
        </TabEntry>
    </Tabs>`;

  return (
    <div>
      <Header>Tabs</Header>
      <Description>
        Tabs are based on a folder metaphor and used to separate content into different sections. Tabs should be ordered to create a visual hierarchy based on priority.
      </Description>
      <Import module="Tabs, TabsEntry" path="/fundamental-react/src/" />
      <Separator />
      <Properties
        type="Inputs"
        properties={[
          { name: 'id', description: 'id of the tab' },
          { name: 'name', description: 'name of the tab' },
          { name: 'content', description: 'the content to display when the tab is pressed' },
          { name: 'disabled', description: 'disable the tab based on true or false' }
        ]}
      />
      <DocsTile>
        <Tabs>
          <TabEntry key="1" tab="tab1">
            {'Hello World1'}
          </TabEntry>
          <TabEntry key="2" tab="tab2">
            {<span>Hello World2</span>}
          </TabEntry>
          <TabEntry key="3" tab="tab3">
            {'Hello World3'}
          </TabEntry>
        </Tabs>
      </DocsTile>
      <DocsText>{tabscomponentCode}</DocsText>
      <Separator />
      <h2>Playground</h2>
      <Playground
        component="tabs"
        schema={[
          {
            attribute: 'ids',
            typeOfAttribute: 'lists',
            enum: ['Tab 1', 'Tab 2', 'Tab 3']
          },
          {
            attribute: 'content',
            typeOfAttribute: 'listsContent',
            enum: ['Tab 1', 'Tab 2', 'Tab 3']
          }
        ]}
      >
        <Tabs>
          <TabEntry key="1" tab="tab1">
            {'Hello World1'}
          </TabEntry>
          <TabEntry key="2" tab="tab2">
            {'Hello World2'}
          </TabEntry>
          <TabEntry key="3" tab="tab3">
            {'Hello World3'}
          </TabEntry>
        </Tabs>
      </Playground>
    </div>
  );
};
