// tslint:disable:max-line-length
// tslint:disable:no-any
// tslint:disable:export-name
// tslint:disable:no-null-keyword
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
import { WebPartTitle } from '@pnp/spfx-controls-react';

export default class ManageUserCustomActions extends React.Component<IManageUserCustomActionsProps, IManageUserCustomActionsState> {
  private _service: IUserCustomActionService;

  constructor(props: IManageUserCustomActionsProps) {
    super(props);
    this._service = new UserCustomActionService(this.props.context);
    this.state = {
      scope: Utility.GetQueryStringParameter('scope') === 'site' ? 'site' : 'web',
      userCustomActions: [],
      isLoading: false,
      editCustomAction: null
    };
  }

  public componentDidMount(): void {
    // Load user custom actions
    this.readDataAndSetState();
  }

  public componentDidUpdate(prevProps: Readonly<IManageUserCustomActionsProps>, prevState: Readonly<IManageUserCustomActionsState>, prevContext: any): void {
    if (prevState.scope !== this.state.scope) {
      this.readDataAndSetState();
    }
  }

  public render(): React.ReactElement<IManageUserCustomActionsProps> {
    return (
      <div className={styles.manageUserCustomActions}>
        <WebPartTitle displayMode={this.props.displayMode} title={this.props.webPartTitle} updateProperty={this.props.updateTitle} />
        <RestrictedContainer Context={this.props.context} RequiredPermissions={SPPermission.manageWeb} NoAccessMessage={strings.NoAccess}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <label>{strings.SelectUserCustomActionScope}</label>
              </div>
              <div className={styles.column}>
                <ChoiceGroup selectedKey={this.state.scope} onChange={this.scopeChanged}
                  options={[
                    { key: 'web', text:  strings.Website },
                    { key: 'site', text: strings.SiteCollection }
                  ]}
                />
              </div>
            </div>
            <div className={styles.row}>
              {this.state.isLoading ? (
                <div>{strings.Loading}</div>
              ) : (
                <div>
                  {this.state.userCustomActions.length > 0 ? (
                    <table className={styles.userCustomActionsTable}>
                      <thead>
                        <tr>
                          <th>{strings.Name}</th>
                          <th>{strings.Location}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.userCustomActions.map(action => (
                          <tr key={action.Id}>
                            <td>{action.Title}</td>
                            <td>{action.Location}</td>
                            <td>
                              <button className={styles.actionButton} onClick={() => this._editUserCustomAction(action)}>
                                <i className='ms-Icon ms-Icon--Edit' aria-hidden='true'></i>
                              </button>
                              <button className={styles.actionButton} onClick={() => this._deleteUserCustomAction(action)}>
                                <i className='ms-Icon ms-Icon--Delete' aria-hidden='true'></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div>{strings.NoUserCustomActionsFound}</div>
                  )}
                </div>
              )}
            </div>

            <p>
              <UserCustomActionCreateDialog context={this.context} />
            </p>
          </div>
        </RestrictedContainer>
      </div>
    );
  }

  private _deleteUserCustomAction = (action: IUserCustomActionProps): void => {
    if (window.confirm(strings.ConfirmDelete)) {
      this._service.deleteUserCustomAction(this.state.scope, action).then(() => {
        this.readDataAndSetState();
      });
    }
  }

  private _editUserCustomAction = (action: IUserCustomActionProps): void => {
    this.setState({ editCustomAction: action });
  }

  private async readDataAndSetState(): Promise<void> {
    this.setState({ isLoading: true });
    const actions: IUserCustomActionProps[] = await this._service.getUserCustomActions(this.state.scope);
    this.setState({ userCustomActions: actions, isLoading: false });
  }

  private scopeChanged = (event: React.FormEvent<HTMLInputElement>, option: any): void => {
    this.setState({ scope: option.key });
  }
}
