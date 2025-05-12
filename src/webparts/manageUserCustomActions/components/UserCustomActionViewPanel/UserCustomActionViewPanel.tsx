// tslint:disable:export-name

import * as React from 'react';
import styles from './UserCustomActionViewPanel.module.scss';
import { IUserCustomActionViewPanelProps } from './IUserCustomActionViewPanelProps';
import { Label } from 'office-ui-fabric-react';

import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
import { Utility } from '../../Utility/Utility';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export class UserCustomActionViewPanel extends React.Component<IUserCustomActionViewPanelProps, {}> {
  public constructor(props: IUserCustomActionViewPanelProps) {
    super(props);
  }

  public render(): React.ReactElement<IUserCustomActionViewPanelProps> {
    return (
      <Panel isOpen={!!this.props.userCustomAction} position={PanelPosition.Right} onDismiss={this.onPanelClosed}>
        {this.props.userCustomAction &&
          <div className={styles.userCustomActionViewPanel}>
            <h1>User Custom Action</h1>
            <div>
            <Label>Title</Label>
            <span>{this.props.userCustomAction.Title}</span>
            </div>
            <div>
            <Label>Location</Label>
            <span>{this.props.userCustomAction.Location}</span>
            </div>
            <div>
            <Label>Id</Label>
            <span>{this.props.userCustomAction.Id}</span>
            </div>
            <div>
            <Label>Rights</Label>
            <span>{Utility.PermissionToString(this.props.userCustomAction.Rights)}</span>
            </div>
          </div>
        }
      </Panel>
    );
  }

  private onPanelClosed = () => {
    this.props.PanelClosed();
  }
}
