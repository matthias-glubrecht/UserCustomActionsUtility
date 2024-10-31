import * as React from 'react';
import styles from './ManageUserCustomActions.module.scss';
import { IManageUserCustomActionsProps } from './IManageUserCustomActionsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {SPPermission} from '@microsoft/sp-page-context';
import RestrictedContaner from './RestrictedContainer/RestrictedContainer';
import * as strings from 'ManageUserCustomActionsWebPartStrings';

export default class ManageUserCustomActions extends React.Component<IManageUserCustomActionsProps, {}> {
  public render(): React.ReactElement<IManageUserCustomActionsProps> {
    return (
      <RestrictedContaner Context={this.props.context} RequiredPermissions={SPPermission.manageWeb} NoAccessMessage={strings.NoAccess}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Inhalt nur für Leute mit ManageWeb-Berechtigung.</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href='https://aka.ms/spfx' className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </RestrictedContaner>
    );
  }
}
