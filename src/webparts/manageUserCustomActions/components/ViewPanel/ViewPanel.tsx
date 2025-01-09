import * as React from 'react';
// import styles from './ViewPanel.module.scss';
import { IViewPanelProps } from './IViewPanelProps';
import { DefaultButton, CommandButton } from 'office-ui-fabric-react';

import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export interface ISidePanelState {
  isOpen?: boolean;
}

export default class ViewPanel extends React.Component<IViewPanelProps, ISidePanelState> {
  public constructor(props: IViewPanelProps) {
    super(props);
  }

  public render(): React.ReactElement<IViewPanelProps> {
    return (
      <Panel isOpen={this.props.IsOpen} position={PanelPosition.Right} onDismiss={this.onPanelClosed}>
      </Panel>
    );
  }

  private onPanelClosed = () => {
    this.props.PanelClosed();
  }
}
