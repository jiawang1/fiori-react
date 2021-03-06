import React, { Component } from 'react';
import { Menu, MenuItem, Shellbar, Icon, Image, Popover, Button } from '@jay.wang/fundamental-react';
import { DocsTile, DocsText, Separator, Header, Description, Import, Properties } from '../documentation';
var images = require.context('../../assets', true);

export class ShellbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  simpleShellbarExampleCode = `<Shellbar
    logo={<img src='//unpkg.com/fiori-fundamentals/dist/images/sap-logo.png' alt='SAP' />}
    productTitle='Corporate Portal'
    profile={this.profile1}
    profileMenu={this.profileMenu} />

************************************ Data ************************************

profile1 = {
    initials: 'JS',
    userName: 'John Snow',
    colorAccent: 8
};

profileMenu = [
    { name: 'Settings', glyph: 'action-settings', size: 's', callback: () => alert('Settings selected!') },
    { name: 'Sign Out', glyph: 'log', size: 's', callback: () => alert('Sign Out selected!') }
];
`;

  menuAndSearchShellbarExampleCode = `<Shellbar
    logoSAP
    productTitle='Corporate Portal'
    productMenu={this.productMenu}
    subtitle='Subtitle'
    notifications={this.notifications}
    searchInput={this.searchInput}
    profile={this.profile}
    profileMenu={this.profileMenu} />

************************************ Data ************************************

productMenu = [
    { name: 'Application A', callback: () => alert('Application A selected!') },
    { name: 'Application B', callback: () => alert('Application B selected!') },
    { name: 'Application C', callback: () => alert('Application C selected!') },
    { name: 'Application D', callback: () => alert('Application D selected!') }
];

notifications = {
    notificationCount: 2,
    label: 'Notifications',
    callback: () => alert('Notification selected!')
};

searchInput = {
    label: 'Search',
    placeholder: 'Enter a fruit',
    onSearch: function(searchTerm) {
        alert(\`Search fired for \${searchTerm}\`);
    },
    callback: () => alert('Search selected!')
};

profile = {
    image: images('./headshot-male.jpg'),
    userName: 'John Snow'
};

profileMenu = [
    { name: 'Settings', glyph: 'action-settings', size: 's', callback: () => alert('Settings selected!') },
    { name: 'Sign Out', glyph: 'log', size: 's', callback: () => alert('Sign Out selected!') }
];


`;

  shellbarExampleCode = `<Shellbar
    logoSAP
    productTitle='Corporate Portal'
    productMenu={this.productMenu}
    subtitle='Subtitle'
    copilot
    searchInput={this.searchInput2}
    actions={this.actions}
    notifications={this.notifications}
    profile={this.profile}
    profileMenu={this.profileMenu}
    productSwitcher={this.productSwitcher}
    productSwitcherList={this.productSwitcherList} />

************************************ Data ************************************

productMenu = [
    { name: 'Application A', callback: () => alert('Application A selected!') },
    { name: 'Application B', callback: () => alert('Application B selected!') },
    { name: 'Application C', callback: () => alert('Application C selected!') },
    { name: 'Application D', callback: () => alert('Application D selected!') }
];

searchInput2 = {
    label: 'Search',
    glyph: 'search',
    placeholder: 'Enter a fruit',
    searchList: [
        { text: 'apple', callback: () => alert('apple') },
        { text: 'apricot', callback: () => alert('apricot') },
        { text: 'acai', callback: () => alert('acai') },
        { text: 'banana', callback: () => alert('banana') },
        { text: 'berry', callback: () => alert('berry') },
        { text: 'blueberry', callback: () => alert('blueberry') },
        { text: 'blackberry', callback: () => alert('blackberry') },
        { text: 'cranberry', callback: () => alert('cranberry') },
        { text: 'conkerberry', callback: () => alert('conkerberry') },
        { text: 'calabash', callback: () => alert('calabash') },
        { text: 'clementines', callback: () => alert('clementines') },
        { text: 'kiwi', callback: () => alert('kiwi') },
        { text: 'orange', callback: () => alert('orange') }
    ],
    onSearch: function(searchTerm) {
        alert(\`Search fired for \${searchTerm}\`);
    },
    callback: () => alert('Search selected!')
};

actions = [
    {
        glyph: 'settings',
        label: 'Settings',
        notificationCount: 5,
        callback: () => alert('Settings selected!'),
        menu: (
            <Menu>
                    <MenuItem url='/'>Option 1</MenuItem>
                    <MenuItem url='/'>Option 2</MenuItem>
                    <MenuItem url='/'>Option 3</MenuItem>
            </Menu>
        )
    }
];

notifications2 = {
    notificationCount: 2,
    label: 'Notifications',
    notificationsBody: (
        <Menu>
                <MenuItem url='/'>Notification 1</MenuItem>
                <MenuItem url='/'>Notification 2</MenuItem>
                <MenuItem url='/'>Notification 3</MenuItem>
        </Menu>
    ),
    noNotificationsBody: (
        <Menu>
                <MenuItem>There are no notifications</MenuItem>
        </Menu>
    ),
    callback: () => alert('Notification selected!')
};

profile = {
    image: images('./headshot-male.jpg'),
    userName: 'John Snow'
};

profileMenu = [
    { name: 'Settings', glyph: 'action-settings', size: 's', callback: () => alert('Settings selected!') },
    { name: 'Sign Out', glyph: 'log', size: 's', callback: () => alert('Sign Out selected!') }
];

productSwitcherList = [
    {
        title: 'Fiori Home',
        image: images('./01.png'),
        glyph: 'home',
        callback: () => alert('Fiori Home selected!')
    },
    {
        title: 'S/4 HANA Cloud',
        image: images('./02.png'),
        glyph: 'cloud',
        callback: () => alert('S/4 HANA Cloud selected!')
    },
    {
        title: 'Analytics Cloud',
        image: images('./03.png'),
        glyph: 'business-objects-experience',
        callback: () => alert('Analytics Cloud selected!')
    },
    { title: 'Ariba', image: images('./04.png'), glyph: 'activate', callback: () => alert('Ariba selected!') },
    {
        title: 'SuccessFactors',
        image: images('./05.png'),
        glyph: 'message-success',
        callback: () => alert('SuccessFactors selected!')
    },
    {
        title: 'Commerce Cloud',
        image: images('./06.png'),
        glyph: 'retail-store',
        callback: () => alert('Commerce Cloud selected!')
    },
    { title: 'Gigya', image: images('./07.png'), glyph: 'customer-view', callback: () => alert('Gigya selected!') },
    {
        title: 'Callidus Cloud',
        image: images('./08.png'),
        glyph: 'globe',
        callback: () => alert('Callidus Cloud selected!')
    },
    {
        title: 'Fieldglass',
        image: images('./09.png'),
        glyph: 'work-history',
        callback: () => alert('Fieldglass selected!')
    },
    { title: 'Concur', image: images('./10.png'), glyph: 'area-chart', callback: () => alert('Concur selected!') },
    {
        title: 'Cloud for Customer',
        image: images('./11.png'),
        glyph: 'customer-view',
        callback: () => alert('Cloud for Customer selected!')
    },
    {
        title: 'Cloud Portal',
        image: images('./12.png'),
        glyph: 'customer',
        callback: () => alert('Cloud Portal selected!')
    }
];

productSwitcher = {
    label: 'Product Switcher'
};
`;

  actions = [
    {
      glyph: 'settings',
      label: 'Settings',
      notificationCount: 5,
      callback: () => alert('Settings selected!'),
      menu: (
        <Menu>
          <MenuItem url="/">Option 1</MenuItem>
          <MenuItem url="/">Option 2</MenuItem>
          <MenuItem url="/">Option 3</MenuItem>
        </Menu>
      )
    }
  ];

  notifications2 = {
    notificationCount: 2,
    label: 'Notifications',
    notificationsBody: (
      <Menu>
        <MenuItem url="/">Notification 1</MenuItem>
        <MenuItem url="/">Notification 2</MenuItem>
        <MenuItem url="/">Notification 3</MenuItem>
      </Menu>
    ),
    noNotificationsBody: (
      <Menu>
        <MenuItem>There are no notifications</MenuItem>
      </Menu>
    ),
    callback: () => alert('Notification selected!')
  };

  notifications = {
    notificationCount: 2,
    label: 'Notifications',
    callback: () => alert('Notification selected!')
  };

  profile1 = {
    initials: 'JS',
    userName: 'John Snow',
    colorAccent: 8
  };

  profile = {
    image: images('./headshot-male.jpg'),
    userName: 'John Snow'
  };

  profileMenu = [
    { name: 'Settings', glyph: 'action-settings', size: 's', callback: () => alert('Settings selected!') },
    { name: 'Sign Out', glyph: 'log', size: 's', callback: () => alert('Sign Out selected!') }
  ];

  productMenu = [
    { name: 'Application A', callback: () => alert('Application A selected!') },
    { name: 'Application B', callback: () => alert('Application B selected!') },
    { name: 'Application C', callback: () => alert('Application C selected!') },
    { name: 'Application D', callback: () => alert('Application D selected!') }
  ];

  productSwitcherList = [
    {
      title: 'Fiori Home',
      image: images('./01.png'),
      glyph: 'home',
      callback: () => alert('Fiori Home selected!')
    },
    {
      title: 'S/4 HANA Cloud',
      image: images('./02.png'),
      glyph: 'cloud',
      callback: () => alert('S/4 HANA Cloud selected!')
    },
    {
      title: 'Analytics Cloud',
      image: images('./03.png'),
      glyph: 'business-objects-experience',
      callback: () => alert('Analytics Cloud selected!')
    },
    { title: 'Ariba', image: images('./04.png'), glyph: 'activate', callback: () => alert('Ariba selected!') },
    {
      title: 'SuccessFactors',
      image: images('./05.png'),
      glyph: 'message-success',
      callback: () => alert('SuccessFactors selected!')
    },
    {
      title: 'Commerce Cloud',
      image: images('./06.png'),
      glyph: 'retail-store',
      callback: () => alert('Commerce Cloud selected!')
    },
    { title: 'Gigya', image: images('./07.png'), glyph: 'customer-view', callback: () => alert('Gigya selected!') },
    {
      title: 'Callidus Cloud',
      image: images('./08.png'),
      glyph: 'globe',
      callback: () => alert('Callidus Cloud selected!')
    },
    {
      title: 'Fieldglass',
      image: images('./09.png'),
      glyph: 'work-history',
      callback: () => alert('Fieldglass selected!')
    },
    { title: 'Concur', image: images('./10.png'), glyph: 'area-chart', callback: () => alert('Concur selected!') },
    {
      title: 'Cloud for Customer',
      image: images('./11.png'),
      glyph: 'customer-view',
      callback: () => alert('Cloud for Customer selected!')
    },
    {
      title: 'Cloud Portal',
      image: images('./12.png'),
      glyph: 'customer',
      callback: () => alert('Cloud Portal selected!')
    }
  ];

  productSwitcher = {
    label: 'Product Switcher'
  };

  searchInput = {
    label: 'Search',
    placeholder: 'Enter a fruit',
    onSearch: function(searchTerm) {
      alert(`Search fired for ${searchTerm}`);
    },
    callback: () => alert('Search selected!')
  };

  searchInput2 = {
    label: 'Search',
    placeholder: 'Enter a fruit',
    searchList: [
      { text: 'apple', callback: () => alert('apple') },
      { text: 'apricot', callback: () => alert('apricot') },
      { text: 'acai', callback: () => alert('acai') },
      { text: 'banana', callback: () => alert('banana') },
      { text: 'berry', callback: () => alert('berry') },
      { text: 'blueberry', callback: () => alert('blueberry') },
      { text: 'blackberry', callback: () => alert('blackberry') },
      { text: 'cranberry', callback: () => alert('cranberry') },
      { text: 'conkerberry', callback: () => alert('conkerberry') },
      { text: 'calabash', callback: () => alert('calabash') },
      { text: 'clementines', callback: () => alert('clementines') },
      { text: 'kiwi', callback: () => alert('kiwi') },
      { text: 'orange', callback: () => alert('orange') }
    ],
    onSearch: function(searchTerm) {
      alert(`Search fired for ${searchTerm}`);
    },
    callback: () => alert('Search selected!')
  };

  render() {
    const { ProductComponent } = Shellbar;
    return (
      <div>
        <Header>Shellbar</Header>
        <Description>
          The shellbar offers consistent, responsive navigation across all products and applications. Includes support for branding, product navigation, search, notifications, user
          settings, and CoPilot. This is a composite component comprised of mandatory and optional elements. Before getting started, here are some things to know.
        </Description>
        <Import module="Shellbar" path="/fundamental-react/src/" />
        <Separator />
        <Properties
          type="Inputs"
          properties={[
            {
              name: 'logo',
              description: '(required/optional) provide an img tag for a logo other than the SAP logo. One of the two props (logo or logoSAP) should be set.'
            },
            {
              name: 'logoSAP',
              description: '(required/optional) renders the SAP logo in the shellbar. One of the two props (logo or logoSAP) should be set.'
            },
            {
              name: 'productTitle',
              description: '(required) displays the current application when no product menu is used.'
            },
            { name: 'productMenu', description: '(optional) holds product titles and navigation.' },
            {
              name: 'subtitle',
              description: '(optional) displays an application context. Should be used rarely.'
            },
            { name: 'copilot', description: '(optional) for use with applications that utilize CoPilot.' },
            { name: 'actions', description: '(optional) holds all product actions and links.' },
            {
              name: 'searchInput',
              description: '(optional) holds searchInput properties (placeholder, searchList, onEnter ).'
            },
            { name: 'profile', description: '(required) user information like name, initials, etc.' },
            {
              name: 'profileMenu',
              description: '(required) for user settings and application meta links such as Sign Out.'
            },
            { name: 'productSwitcher', description: '(optional) for navigating between products.' },
            { name: 'productSwitcherList', description: '(optional) list of the products.' }
          ]}
        />
        <Separator />
        <h2>New Shell</h2>
        <Description>
          When a product has multiple links, the product links should collapse into an overflow menu on mobile screens. All actions, except for the user menu, should be collapsed.
        </Description>
        <DocsTile>
          <Shellbar
            companyLogoComponent={
              <Shellbar.CompanyLogo url="#">
                <Icon glyph="cart" size="xl" />
              </Shellbar.CompanyLogo>
            }
            productComponent={
              <ProductComponent title="Corporate Portal">
                <Menu showSelection={false}>
                  <MenuItem key="1">Option 1</MenuItem>
                  <MenuItem key="2">Option 2</MenuItem>
                  <MenuItem key="3">Option 3</MenuItem>
                </Menu>
              </ProductComponent>
            }
            subTitle="sub title"
          />
        </DocsTile>
        <DocsText>{this.shellbarExampleCode}</DocsText>

        <Separator />

        <h2>New Shell</h2>
        <Description>
          When a product has multiple links, the product links should collapse into an overflow menu on mobile screens. All actions, except for the user menu, should be collapsed.
        </Description>
        <DocsTile>
          <Shellbar
            companyLogoComponent={
              <Shellbar.CompanyLogo url="#">
                <Image photo="https://placeimg.com/400/400/nature" />
              </Shellbar.CompanyLogo>
            }
            productComponent={<ProductComponent title="Corporate Portal" />}
            userProfileComponent={
              <Shellbar.UserProfileComponent url="/static/media/headshot-male.10d4e22e.jpg">
                <Menu showSelection={false}>
                  <MenuItem key="1">Profile</MenuItem>
                  <MenuItem key="2">Setting</MenuItem>
                  <MenuItem key="3">Logout</MenuItem>
                </Menu>
              </Shellbar.UserProfileComponent>
            }
            actionButtons={[
              <Shellbar.ActionButton
                glyph="cart"
                count={10}
                onClick={() => {
                  alert('clicked');
                }}
              />,
              <Shellbar.ActionButton
                glyph="bell"
                onClick={() => {
                  alert('clicked');
                }}
              />
            ]}
          />
        </DocsTile>
        <DocsText>{this.shellbarExampleCode}</DocsText>
        <Separator />

        <h2>New Shell</h2>
        <Description>
          When a product has multiple links, the product links should collapse into an overflow menu on mobile screens. All actions, except for the user menu, should be collapsed.
        </Description>
        <DocsTile>
          <Shellbar
            withCopilot
            companyLogoComponent={
              <Shellbar.CompanyLogo url="#">
                <img src="//unpkg.com/fiori-fundamentals/dist/images/sap-logo.png" alt="SAP" />
              </Shellbar.CompanyLogo>
            }
          />
        </DocsTile>
        <DocsText>{this.shellbarExampleCode}</DocsText>
      </div>
    );
  }
}
