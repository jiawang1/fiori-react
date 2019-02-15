import React, { Component,ReactElement,MouseEvent } from 'react';
import { IProps } from '../common/IProps';
import {ITabEntryProps} from './TabEntry';
import {TabHeaderItem} from './TabHeaderItem';


export interface ITabsProps extends IProps<Tabs> {
  defaultSelectedkey:string
}

export class Tabs extends Component<ITabsProps, any> {
  constructor(props: ITabsProps) {
    super(props);
    const {defaultSelectedkey, children} = props;
    this.state = {
      selectedKey : this.resolveSelected(defaultSelectedkey, children as ReactElement<ITabEntryProps>)
    };
  }

  onClickHeaderItem = (e:MouseEvent<HTMLLIElement>, key: string|number)=>{
    this.setState({
      selectedKey: key
    })
  }

  renderTabHeader = () => {
    const { children } = this.props;
    const {selectedKey} = this.state;

    return  <ul className="fd-tabs" role="tablist">{
      React.Children.map(children as ReactElement<ITabEntryProps>, tabEntry => {
        const { props :{ disabled, tab }, key } = tabEntry;
        return (
          <TabHeaderItem itemKey={key + ''} selected = {  selectedKey === null? false : selectedKey === key} tab = {tab} disabled = { !!disabled } onClick={this.onClickHeaderItem}/>
        );
      })
    } </ul>;
  };

  renderPanel = ()=>{
    const { children } = this.props;
    const {selectedKey} = this.state;
    let targetItem :ReactElement<ITabEntryProps> | null = null;
    React.Children.forEach(children as Array<ReactElement<ITabEntryProps>> , child =>{
      if( child.key === selectedKey){
        targetItem = child;
      }
    });
    return targetItem;
  }
  render() {
    const { className } = this.props;
    return (
      <div className={`fd-tabs-container${className ? ` ${className}` : ''}`} >
        {this.renderTabHeader()}
        {this.renderPanel()}
      </div>
    );
  }
  private resolveSelected = ( defaultKey : string | number, children :ReactElement<ITabEntryProps> )=>{
    if(typeof defaultKey === 'string' || typeof defaultKey === 'number'){
      return defaultKey;
    }
    let targetItem :ReactElement<ITabEntryProps> | null = null;
    React.Children.forEach(children, child =>{
      const {props: {disabled}} = child;
      if(!disabled && !targetItem ){
        targetItem = child;
      }
    });
    return targetItem ? (targetItem as ReactElement<ITabEntryProps>).key : null;
  }
}
