import React, { Component, ReactNode } from 'react';
import { IProps } from '../common/IProps';
import PropTypes from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';


export interface ITabEntryProps extends IProps<TabEntry>{
    tab : string| ReactNode,
    key: string, 
    disabled ?: boolean,
    id ?: string|number
}

export class TabEntry extends Component<ITabEntryProps> {
    constructor(props : ITabEntryProps) {
      super(props);
      let initialStates = [];
  
      initialStates = props.ids.forEach(ids => {
        const obj = {};
        const id = ids.id;
        obj[id] = false;
        return obj;
      });
      this.state = {
        selectedTab: '1',
        tabStates: initialStates
      };
  
      this.handleTabSelection = this.handleTabSelection.bind(this);
    }
  
    handleTabSelection(e, id) {
      const iStates = Object.assign({}, this.state.tabStates);
      iStates[id.id] = !iStates[id.id];
      this.setState({ tabStates: iStates });
      this.setState({ selectedTab: id.id });
    }
  
    render() {
      const { ids, className, ...rest } = this.props;
      return (
        <BrowserRouter>
          <ul className={`fd-tabs${className ? ` ${className}` : ''}`} {...rest}>
            {ids.map(id => (
              <li className="fd-tabs__item" key={id.id}>
                <Link
                  aria-disabled={id.disabled}
                  className={`fd-tabs__link${this.state.selectedTab === id.id ? ' is-selected' : ''}`}
                  to={{ pathname: id.url }}
                  onClick={e => {
                    !id.disabled && this.handleTabSelection(e, id, id.disabled);
                  }}
                >
                  {id.name}
                </Link>
                {this.state.selectedTab === id.id ? <p className="fd-tabs__content">{id.content}</p> : null}
              </li>
            ))}
          </ul>
        </BrowserRouter>
      );
    }
  }
  
  TabEntry.propTypes = {
    ids: PropTypes.array.isRequired,
    className: PropTypes.string
  };
  