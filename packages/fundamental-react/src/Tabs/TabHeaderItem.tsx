import React, { Component, ReactNode,MouseEvent } from 'react';
import { IProps } from '../common/BasicTypes';


export interface ITabHeaderItemProps extends IProps<TabHeaderItem> {
    selected: boolean,
    itemKey: string|number,
    tab : string| ReactNode,
    disabled: boolean,
    onClick:  ( e: MouseEvent<HTMLLIElement>, key : string|number  )=>void
}

export class TabHeaderItem extends Component<ITabHeaderItemProps> {
    constructor(props: ITabHeaderItemProps){
        super(props);
    }
    handleClick = (e: MouseEvent<HTMLLIElement>) =>{
        const {onClick, disabled, itemKey} = this.props;
        if(!disabled){onClick(e, itemKey)}
    }

    render(){
        const { tab,selected, disabled } = this.props;
        return (
            <li className="fd-tabs__item" onClick={ this.handleClick  }>
            <span className="fd-tabs__link" aria-disabled={disabled} role="tab" aria-selected={ selected }>
              {tab}
            </span>
          </li>
        );
    }
}
