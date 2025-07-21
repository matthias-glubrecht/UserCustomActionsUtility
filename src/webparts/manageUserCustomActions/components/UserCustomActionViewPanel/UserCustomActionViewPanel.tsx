// tslint:disable:export-name variable-name max-line-length

import * as React from 'react';
import styles from './UserCustomActionViewPanel.module.scss';
import { Label } from 'office-ui-fabric-react';
import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
import { Utility } from '../../Utility/Utility';
import { IUserCustomActionViewPanelProps } from './IUserCustomActionViewPanelProps';
import { userCustomActionProps } from '../../Utility/UserCustomActionHelper';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export const UserCustomActionViewPanel: (props: IUserCustomActionViewPanelProps) => React.ReactElement<IUserCustomActionViewPanelProps> = (props: IUserCustomActionViewPanelProps): React.ReactElement<IUserCustomActionViewPanelProps> => {
  const onPanelClosed: () => void = () => {
    props.PanelClosed();
  };

  const isVisible: (property: string) => boolean = (property: string): boolean => {
    if (!props.userCustomAction || !props.userCustomAction.Location) {
      return false;
    }
    const { Location } = props.userCustomAction;
    return userCustomActionProps && userCustomActionProps[Location] && userCustomActionProps[Location].indexOf(property) !== -1;
  };

  return (
    <Panel isOpen={!!props.userCustomAction} position={PanelPosition.Right} width={600} onDismiss={onPanelClosed}>
      {props.userCustomAction &&
        <div className={styles.userCustomActionViewPanel}>
          <h1>User Custom Action</h1>
          <div>
            <Label>Title</Label>
            <span>{props.userCustomAction.Title}</span>
          </div>
          <div>
            <Label>Location</Label>
            <span>{props.userCustomAction.Location}</span>
          </div>
          <div>
            <Label>Description</Label>
            <span>{props.userCustomAction.Description}</span>
          </div>
          <div>
            <Label>Name</Label>
            <span>{props.userCustomAction.Name}</span>
          </div>
          {isVisible('ClientSideComponentProperties') &&
            <div>
              <Label>ClientSideComponentProperties</Label>
              <span>
              <pre>{props.userCustomAction.ClientSideComponentProperties}</pre>
              </span>
            </div>
          }
          {isVisible('ClientSideComponentId') &&
            <div>
              <Label>ClientSideComponentId</Label>
              <span>{props.userCustomAction.ClientSideComponentId}</span>
            </div>
          }
          <div>
            <Label>Id</Label>
            <span>{props.userCustomAction.Id}</span>
          </div>
          {isVisible('Rights') &&
            <div>
              <Label>Rights</Label>
              <span>{Utility.PermissionToString(props.userCustomAction.Rights)}</span>
            </div>
          }
        </div>
      }
    </Panel>
  );
};
