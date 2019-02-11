import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '@jay.wang/fundamental-react';
import { DocsTile, DocsText, Separator, Header, Description, Import } from '../documentation';

export const BreadcrumbComponent = () => {
  const breadcrumbHrefCode = `<Breadcrumb>
  <BreadcrumbItem url="#" name="Link Text1" key="1" />
  <BreadcrumbItem url="#" name="Link Text2" key="2" />
  <BreadcrumbItem url="#" name="Link Text3" key="3" />
</Breadcrumb>`;

  const breadcrumbLinkCode = `const routes = [
    {
      name: 'home',
      url: '/breadcrumb'
    },
    {
      name: 'level1',
      url: '/breadcrumb#/l1'
    },
    {
      name: 'level2',
      url: '/breadcrumb#/l2'
    }
  ];
  <Breadcrumb routes={routes} />
  `;

  const breadCrumbRouterCode = `  import { Link } from 'react-router-dom';
  const routes = [
    {
      name: 'home',
      url: '/breadcrumb'
    },
    {
      name: 'level1',
      url: '/breadcrumb/l1'
    },
    {
      name: 'level2',
      url: '/breadcrumb/l2'
    }
  ];
  const renderer = route => (
    <Link to={route.url} className="fd-breadcrumb__link">
      {route.name}
    </Link>
  );
  <Breadcrumb routes={routes} itemRender={renderer} />
  `;

  const routes = [
    {
      name: 'home',
      url: '/breadcrumb'
    },
    {
      name: 'level1',
      url: '/breadcrumb/#l1'
    },
    {
      name: 'level2',
      url: '/breadcrumb/#l1/l2'
    }
  ];

  const renderer = route => (
    <Link to={route.url} className="fd-breadcrumb__link">
      {route.name}
    </Link>
  );
  return (
    <div>
      <Header>Breadcrumb</Header>
      <Description>
        The breadcrumb allows users to see the current page and navigation path to that page. Users can navigate to previous levels in the path. When clicking on the current page,
        a dropdown allows users to access other pages at that same level.
      </Description>
      <Import module="Breadcrumb, BreadcrumbItem" path="/fundamental-react/src/" />

      <Separator />

      <Description>An example using url (href attribute)</Description>
      <DocsTile>
        <Breadcrumb>
          <BreadcrumbItem url="#" name="Link Text1" key="1" />
          <BreadcrumbItem url="#" name="Link Text2" key="2" />
          <BreadcrumbItem url="#" name="Link Text3" key="3" />
        </Breadcrumb>
      </DocsTile>
      <DocsText>{breadcrumbHrefCode}</DocsText>

      <Separator />

      <Description>An example using link (routerLink)</Description>
      <DocsTile>
        <Breadcrumb routes={routes} />
      </DocsTile>
      <DocsText>{breadcrumbLinkCode}</DocsText>

      <Separator />

      <Description>An example using renderer with react router</Description>
      <DocsTile>
        <Breadcrumb routes={routes} itemRender={renderer} />
      </DocsTile>
      <DocsText>{breadCrumbRouterCode}</DocsText>
    </div>
  );
};
