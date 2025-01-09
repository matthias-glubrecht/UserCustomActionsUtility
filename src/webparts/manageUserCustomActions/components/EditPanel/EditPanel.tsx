import * as React from 'react';
// import styles from './EditPanel.module.scss';
import { IEditPanelProps } from './IEditPanelProps';
import { DefaultButton, CommandButton } from 'office-ui-fabric-react';

import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export interface ISidePanelState {
  isOpen?: boolean;
}

export default class EditPanel extends React.Component<IEditPanelProps, ISidePanelState> {
  public constructor(props: IEditPanelProps) {
    super(props);
  }

  public render(): React.ReactElement<IEditPanelProps> {
    let infotext = '';
    let dateInfo: JSX.Element;

    return (
      <Panel isOpen={this.props.IsOpen} position={PanelPosition.Right} onDismiss={this.onPanelClosed}>
      </Panel>
    );
  }

  private onPanelClosed = () => {
    this.props.PanelClosed();
  }
}
