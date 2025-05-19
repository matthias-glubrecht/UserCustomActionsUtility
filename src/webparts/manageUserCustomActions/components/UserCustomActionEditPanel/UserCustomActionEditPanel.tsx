// tslint:disable:max-line-length export-name
import * as React from 'react';
// import styles from './EditPanel.module.scss';
import { IUserCustomActionEditPanelProps } from './IUserCustomActionEditPanelProps';
import { DefaultButton, CommandButton, Label, TextField } from 'office-ui-fabric-react';

import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
import { userCustomActionProps } from '../../Utility/UserCustomActionHelper';
import styles from './UserCustomActionEditPanel.module.scss';
import { IUserCustomActionEditPanelState } from './IUserCustomActionEditPanelState';
import { Utility } from '../../Utility/Utility';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export class UserCustomActionEditPanel extends React.Component<IUserCustomActionEditPanelProps, IUserCustomActionEditPanelState> {
  public constructor(props: IUserCustomActionEditPanelProps) {
    super(props);
    this.state = {
      userCustomAction: props.userCustomAction
    };
  }

  public render(): React.ReactElement<IUserCustomActionEditPanelProps> {

    return (
      <Panel isOpen={!!this.props.userCustomAction} position={PanelPosition.Right} onDismiss={this.onPanelClosed} width={600}>
        {this.props.userCustomAction &&
          <div className={styles.editPanel}>
            <h1>Edit User Custom Action</h1>
            <div>
              <Label>Title</Label>
              <TextField
                value={this.state.userCustomAction.Title}
              />
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
            {this.hasProperty('ClientSideComponentProperties') &&
              <div>
                <Label>ClientSideComponentProperties</Label>
                <TextField
                  multiline={true}
                  value={this.state.userCustomAction.ClientSideComponentProperties}
                />
              </div>
            }
            {this.hasProperty('ClientSideComponentId') &&
              <div>
                <Label>ClientSideComponentId</Label>
                <span>{this.props.userCustomAction.ClientSideComponentId}</span>
              </div>
            }
            <div>
              <Label>Id</Label>
              <span>{this.props.userCustomAction.Id}</span>
            </div>
            {this.hasProperty('Rights') &&
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

  private hasProperty(property: string): boolean {
    const { Location } = this.props.userCustomAction;
    return userCustomActionProps[Location].indexOf(property) !== -1;
  }

  private onPanelClosed = () => {
    this.props.PanelClosed();
  }
}
