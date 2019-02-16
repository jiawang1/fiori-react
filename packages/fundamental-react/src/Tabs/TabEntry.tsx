import React, { ReactNode } from 'react';
import { IFunctionalProps } from '../common/BasicTypes';

export interface ITabEntryProps extends IFunctionalProps {
  tab: string | ReactNode;
  key: string;
  disabled?: boolean;
  id?: string | number;
}

export const TabEntry = (props: ITabEntryProps) => {
 const {children} = props;
 return <div className="fd-tabs__panel" role="tabpanel">
    {children}
  </div>
};
