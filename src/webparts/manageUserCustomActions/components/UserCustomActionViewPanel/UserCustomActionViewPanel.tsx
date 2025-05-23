// tslint:disable:export-name max-line-length

import * as React from 'react';
import styles from './UserCustomActionViewPanel.module.scss';
import { Label } from 'office-ui-fabric-react';
import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
import { Utility } from '../../Utility/Utility';
import { IUserCustomActionViewPanelProps } from './IUserCustomActionViewPanelProps';
import { userCustomActionProps } from '../../Utility/UserCustomActionHelper';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export class UserCustomActionViewPanel extends React.Component<IUserCustomActionViewPanelProps, {}> {
  public constructor(props: IUserCustomActionViewPanelProps) {
    super(props);
  }

  public render(): React.ReactElement<IUserCustomActionViewPanelProps> {
    return (
      <Panel isOpen={!!this.props.userCustomAction} position={PanelPosition.Right} width={600} onDismiss={this.onPanelClosed}>
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
              <Label>Description</Label>
              <span>{this.props.userCustomAction.Description}</span>
            </div>
            <div>
              <Label>Name</Label>
              <span>{this.props.userCustomAction.Name}</span>
            </div>
            {this.isVisible('ClientSideComponentProperties') &&
              <div>
                <Label>ClientSideComponentProperties</Label>
                <span>
                <pre>{this.props.userCustomAction.ClientSideComponentProperties}</pre>
                </span>
              </div>
            }
            {this.isVisible('ClientSideComponentId') &&
              <div>
                <Label>ClientSideComponentId</Label>
                <span>{this.props.userCustomAction.ClientSideComponentId}</span>
              </div>
            }
            <div>
              <Label>Id</Label>
              <span>{this.props.userCustomAction.Id}</span>
            </div>
            {this.isVisible('Rights') &&
              <div>
                <Label>Rights</Label>
                <span>{Utility.PermissionToString(this.props.userCustomAction.Rights)}</span>
              </div>
            }
          </div>
        }
      </Panel>
    );
  }

  private isVisible(property: string): boolean {
    const { Location } = this.props.userCustomAction;
    return userCustomActionProps[Location].indexOf(property) !== -1;
  }

  private onPanelClosed = () => {
    this.props.PanelClosed();
  }
}
