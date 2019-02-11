import React, { ReactElement } from 'react';
import { IProps, IFunctionalProps } from '../common/IProps';

interface IRoute {
  name: string;
  url: string;
}

export interface IBreadCrumbProps extends IProps<Breadcrumb> {
  routes?: IRoute[];
  itemRender?: (route: IRoute, routes: IRoute[]) => ReactElement<IBreadcrunbItemProps>;
}

const defaultRender: IBreadCrumbProps['itemRender']  = (route, routes) => {
  const { name, url } = route;
  return  <a className="fd-breadcrumb__link" href={url}>{name}</a>;
};

export class Breadcrumb extends React.Component<IBreadCrumbProps> {

  renderByRoutes = ()=>{
    const { itemRender, routes } = this.props;
    if (routes) {
      const renderer = (itemRender || defaultRender);
      return routes.map( (route,inx) => {
        if (typeof renderer === 'function') {
          const isCurrent = inx === routes.length-1;
          return  <BreadcrumbItem key={`${route.url}${route.name}`} isCurrent={isCurrent} name={route.name}>{renderer(route, routes)}</BreadcrumbItem>; 
        }
        return null;
      });
    }
  }

  renderByChildren = ()=>{
    const { children } = this.props;
    const count = React.Children.count(children);
    return React.Children.toArray(children).map((child, inx)=>{
      if(inx === count -1){
        return React.cloneElement(child as ReactElement<IBreadcrunbItemProps>, {isCurrent: true});
      }
      return child;
    });
  }

  render() {
    const { routes } = this.props;
    return <ul className="fd-breadcrumb">{ routes? this.renderByRoutes() : this.renderByChildren()}</ul>;
  }
}

export interface IBreadcrunbItemProps extends IFunctionalProps{
  name : string,
  url ?: string, 
  key: string,
  isCurrent ?: boolean
}

export const BreadcrumbItem : (props :IBreadcrunbItemProps)=> ReactElement<IBreadcrunbItemProps>  = ({ url, name, className, isCurrent, children,...props }) => (
    <li className={`fd-breadcrumb__item${className ? ` ${className}` : ''}`} {...props}>
        {
          isCurrent? <span>{name}</span> : React.isValidElement(children)? children : <a className="fd-breadcrumb__link" href={url}>{name} </a>
        }
    </li>
);
