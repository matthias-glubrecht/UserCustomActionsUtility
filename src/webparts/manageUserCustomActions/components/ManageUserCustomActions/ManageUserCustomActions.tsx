// tslint:disable:max-line-length
// tslint:disable:no-any
// tslint:disable:export-name
import * as React from 'react';
import styles from '../ManageUserCustomActions/ManageUserCustomActions.module.scss';
import { IManageUserCustomActionsProps } from './IManageUserCustomActionsProps';
import { IManageUserCustomActionsState } from './IManageUserCustomActionsState';
import { IUserCustomActionService } from '../../services/UserCustomActionService/IUserCustomActionService';
import { UserCustomActionService } from '../../services/UserCustomActionService/UserCustomActionService';
import { SPPermission } from '@microsoft/sp-page-context';
import RestrictedContainer from '../RestrictedContainer/RestrictedContainer';
import * as strings from 'ManageUserCustomActionsWebPartStrings';
import UserCustomActionCreateDialog from '../UserCustomActionCreateDialog/UserCustomActionCreateDialog';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
// import { WebPartTitle } from '@pnp/spfx-controls-react';
// import { Panel } from 'office-ui-fabric-react/lib/Panel';
// import { DisplayMode } from '@microsoft/sp-core-library';
import Utility from '../../Utility/Utility';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';

export default class ManageUserCustomActions extends React.Component<IManageUserCustomActionsProps, IManageUserCustomActionsState> {
  private _service: IUserCustomActionService;

  constructor(props: IManageUserCustomActionsProps) {
    super(props);
    this.state = {
      scope: Utility.GetQueryStringParameter('scope') === 'site' ? 'site' : 'web',
      userCustomActions: [],
      isLoading: false
    };
  }

  public componentDidMount(): void {
    // Load user custom actions
    this._service = new UserCustomActionService();
    this.readDataAndSetState();
  }

  public componentDidUpdate(prevProps: Readonly<IManageUserCustomActionsProps>, prevState: Readonly<IManageUserCustomActionsState>, prevContext: any): void {
    if (prevState.scope !== this.state.scope) {
      this.readDataAndSetState();
    }
  }

  public render(): React.ReactElement<IManageUserCustomActionsProps> {
    return (
      <RestrictedContainer Context={this.props.context} RequiredPermissions={SPPermission.manageWeb} NoAccessMessage={strings.NoAccess}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              Wählen Sie die Art der UserCustomActions aus
            </div>
            <div className={styles.column}>
              <ChoiceGroup selectedKey={this.state.scope} onChange={this.scopeChanged}
                options={[
                  { key: 'web', text: `Website (${this.props.context.pageContext.web.absoluteUrl})`},
                  { key: 'site', text: `Websitesammlung (${this.props.context.pageContext.site.absoluteUrl})`}
                ]}
              />
            </div>
          </div>
          <div className={styles.row}>
            {this.state.isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {this.state.userCustomActions.length > 0 ? (
                  <ul>
                    {this.state.userCustomActions.map(action => (
                      <li key={action.Id}>{action.Title}</li>
                    ))}
                  </ul>
                ) : (
                  <div>No user custom actions found.</div>
                )}
              </div>
            )}
            </div>

            <p>
              <UserCustomActionCreateDialog context={this.context} />
            </p>
        </div>
      </RestrictedContainer>
    );
  }

  private async readDataAndSetState(): Promise<void> {
    this.setState({ isLoading: true });
    const actions: IUserCustomActionProps[] = await this._service.getUserCustomActions(this.props.context, this.state.scope);
    this.setState({ userCustomActions: actions, isLoading: false });
  }

  private scopeChanged = (event: React.FormEvent<HTMLInputElement>, option: any): void => {
    this.setState({ scope: option.key });
  }
}
