Fundamental-react is a set of [React.js](https://reactjs.org/) components implementation of [SAP Fiori Fundamentals library](https://sap.github.io/fundamental/).

<p align="center">
     <a href="https://travis-ci.org/SAP/fundamental-react">
            <img src="https://travis-ci.org/SAP/fundamental-react.svg?branch=develop" alt="Build Status">
      </a>
</p>

<p align="center">
:open_book: 
    <strong><a href="https://sap.github.io/fundamental-react/">Component Documentation</a></strong>
:open_book:
</p>

## Description

Fundamental-react is a set of [React.js](https://reactjs.org/) components implementation of [SAP Fiori Fundamentals library](https://sap.github.io/fundamental/). SAP Fiori Fundamentals library is a Design System and HTML/CSS Component Library used to build modern Product User Experiences with the SAP look and feel. This will allow you to stay/use React for your application and get SAP look and feel.

# Getting started

## Install

To download and use this library, you first need to install the node package manager - [npm](https://www.npmjs.com/get-npm).
Fundamental-react does not include the [SAP Fiori Fundamentals library](https://sap.github.io/fundamental/) which is required for styling.

1. Install Fiori Fundamentals:

`npm install --save fiori-fundamentals`

2. Install Fundamental-react:

`npm install --save @jay.wang/fundamental-react`

[npm package for fundamental-react](https://www.npmjs.com/package/fundamental-react)

3. Include the Fiori Fundamentals CSS in your React application. In your App.css or App.scss file include the following lines:

```
$fd-icons-path: "~fiori-fundamentals/scss/icons/";
$fd-fonts-path: "~fiori-fundamentals/scss/fonts/";
@import '../node_modules/fiori-fundamentals/scss/all.scss';
```

You can now use the [Component Documentation](https://sap.github.io/fundamental-react/) to browse the components currently available with Fundamental Vue. To use a Fundamental-react component, paste the desired code snippet from the Component Documentation and configure it as necessarry:

    ...
    <Button compact>Compact</Button>

    <Icon glyph="cart" size="l" />
    ...

## Contribution to this project

Clone this project into your local, then navigate to root directory of this project and execute
```
npm run boot
```
Install lerna fist and other external dependencies and hoist to parent folder, link internal dependencies.
```
npm start
```
Start up the development environment. This command will run playground and watch component libary to enable realtime refreshing in playground when code of component changed. You can check project in https://locahost:3000. 

## How to obtain support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-react/issues/new)

## Contributing

If you want to contribute, please check the [CONTRIBUTING.md](./CONTRIBUTING.md) documentation for contribution guidelines.

## License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](https://github.com/SAP/fundamental-react/blob/master/LICENSE.txt)