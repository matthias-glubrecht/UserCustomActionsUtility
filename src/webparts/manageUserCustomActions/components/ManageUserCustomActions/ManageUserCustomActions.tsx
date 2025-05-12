// tslint:disable:max-line-length
// tslint:disable:no-any
// tslint:disable:export-name
import * as React from 'react';
import styles from './ManageUserCustomActions.module.scss';
import { IManageUserCustomActionsProps } from './IManageUserCustomActionsProps';
import { IManageUserCustomActionsState } from './IManageUserCustomActionsState';
import { IUserCustomActionService } from '../../services/UserCustomActionService/IUserCustomActionService';
import { UserCustomActionService } from '../../services/UserCustomActionService/UserCustomActionService';
import { SPPermission } from '@microsoft/sp-page-context';
import RestrictedContainer from '../RestrictedContainer/RestrictedContainer';
import * as strings from 'ManageUserCustomActionsWebPartStrings';
import { Utility } from '../../Utility/Utility';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';
import { WebPartTitle } from '@pnp/spfx-controls-react';
import ScopeSelector from '../ScopeSelector/ScopeSelector';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { UserCustomActionViewPanel } from '../UserCustomActionViewPanel/UserCustomActionViewPanel';
import { UserCustomActionEditPanel } from '../UserCustomActionEditPanel/UserCustomActionEditPanel';
import { DisplayMode } from '@microsoft/sp-core-library';

export default class ManageUserCustomActions extends React.Component<IManageUserCustomActionsProps, IManageUserCustomActionsState> {
  private _service: IUserCustomActionService;

  constructor(props: IManageUserCustomActionsProps) {
    super(props);
    this._service = new UserCustomActionService(this.props.context);
    this.state = {
      scope: Utility.GetQueryStringParameter('scope') === UserCustomActionScope.Site ? UserCustomActionScope.Site : UserCustomActionScope.Web,
      userCustomActions: [],
      isLoading: false,
      editCustomAction: undefined,
      viewCustomAction: undefined
    };
  }

  public componentDidMount(): void {
    this.readDataAndSetState();
  }

  public componentDidUpdate(prevProps: Readonly<IManageUserCustomActionsProps>, prevState: Readonly<IManageUserCustomActionsState>, prevContext: any): void {
    if (prevState.scope !== this.state.scope) {
      this.readDataAndSetState();
    }
  }

  public render(): React.ReactElement<IManageUserCustomActionsProps> {
    return (
      <div className={styles.manageUserCustomActions} >
        <WebPartTitle displayMode={DisplayMode.Read} title={this.props.webPartTitle} updateProperty={undefined} />
        <RestrictedContainer Context={this.props.context} RequiredPermissions={SPPermission.manageWeb} NoAccessMessage={strings.NoAccess}>
          <div className={styles.container}>
            <div className={styles.row}>
              <div className={styles.column}>
                <ScopeSelector selectedScope={this.state.scope} onScopeChange={(scope) => this.setState({ scope: scope, editCustomAction: undefined, viewCustomAction: undefined })} />
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
                              <button className={styles.actionButton} onClick={() => this._viewUserCustomAction(action)}>
                                <i className='ms-Icon ms-Icon--View' aria-hidden='true'></i>
                              </button>
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
            <UserCustomActionEditPanel
              userCustomAction={this.state.editCustomAction}
              templates={this.props.actions}
              service={this._service}
              PanelClosed={() => this.setState({ editCustomAction: undefined })}
            />
            <UserCustomActionViewPanel
              userCustomAction={this.state.viewCustomAction}
              PanelClosed={() => this.setState({ viewCustomAction: undefined })}
            />
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
    this.setState({ editCustomAction: action, viewCustomAction: undefined });
  }

  private _viewUserCustomAction = (action: IUserCustomActionProps): void => {
    if (this.state.editCustomAction === undefined) {
      if (this.state.viewCustomAction !== action) {
        this.setState({ viewCustomAction: action, editCustomAction: undefined });
      } else {
        this.setState({ viewCustomAction: undefined });
      }
    }
  }

  private async readDataAndSetState(): Promise<void> {
    this.setState({ isLoading: true });
    const actions: IUserCustomActionProps[] = await this._service.getUserCustomActions(this.state.scope);
    this.setState({ userCustomActions: actions, isLoading: false });
  }
}
