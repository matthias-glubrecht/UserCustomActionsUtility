// tslint:disable:max-line-length export-name
import * as React from 'react';
// import styles from './EditPanel.module.scss';
import { IUserCustomActionEditPanelProps } from './IUserCustomActionEditPanelProps';
import { DefaultButton, CommandButton } from 'office-ui-fabric-react';

import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export class UserCustomActionEditPanel extends React.Component<IUserCustomActionEditPanelProps, {}> {
  public constructor(props: IUserCustomActionEditPanelProps) {
    super(props);
  }

  public render(): React.ReactElement<IUserCustomActionEditPanelProps> {

    return (
      <Panel position={PanelPosition.Right} onDismiss={this.onPanelClosed}>
        <div>Leer</div>
      </Panel>
    );
  }

  private onPanelClosed = () => {
    this.props.PanelClosed();
  }
}
