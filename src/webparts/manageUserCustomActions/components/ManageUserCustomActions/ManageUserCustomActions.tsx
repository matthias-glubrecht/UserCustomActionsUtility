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
import { ScopeSelector } from '../ScopeSelector/ScopeSelector';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { UserCustomActionViewPanel } from '../UserCustomActionViewPanel/UserCustomActionViewPanel';
import { UserCustomActionEditPanel } from '../UserCustomActionEditPanel/UserCustomActionEditPanel';
import { DisplayMode } from '@microsoft/sp-core-library';
import { DocumentCard, DocumentCardActions, DocumentCardTitle } from 'office-ui-fabric-react/lib/DocumentCard';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';

export default class ManageUserCustomActions extends React.Component<IManageUserCustomActionsProps, IManageUserCustomActionsState> {
  private _service: IUserCustomActionService;

  private readonly _gridStyles: string = mergeStyles({
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '0',
    marginLeft: '-12px',
    marginRight: '-12px'
  });

  private readonly _cardContainerStyles: string = mergeStyles({
    flex: '1 1 320px',
    minWidth: '320px',
    maxWidth: '450px',
    padding: '12px'
  });

  private readonly _cardStyles: string = mergeStyles({
    minHeight: '120px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    selectors: {
      ':hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)'
      }
    }
  });

  private readonly _locationBadgeStyles: string = mergeStyles({
    display: 'inline-block',
    padding: '2px 8px',
    backgroundColor: '#f3f2f1',
    borderRadius: '2px',
    fontSize: '11px',
    color: '#323130',
    marginTop: '4px'
  });

  constructor(props: IManageUserCustomActionsProps) {
    super(props);
    this._service = new UserCustomActionService(this.props.context);
    this.state = {
      scope: Utility.GetQueryStringParameter('scope') === UserCustomActionScope.Site ? UserCustomActionScope.Site : UserCustomActionScope.Web,
      selectedListId: undefined,
      userCustomActions: [],
      isLoading: false,
      editCustomAction: undefined,
      viewCustomAction: undefined,
      createCustomAction: false
    };
  }

  public componentDidMount(): void {
    this.readDataAndSetState();
  }

  public componentDidUpdate(prevProps: Readonly<IManageUserCustomActionsProps>, prevState: Readonly<IManageUserCustomActionsState>, prevContext: any): void {
    if (prevState.scope !== this.state.scope || prevState.selectedListId !== this.state.selectedListId) {
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
                <div className={styles.scopeSelectorSection}>
                  <h3>Configuration</h3>
                  <ScopeSelector
                    selectedScope={this.state.scope}
                    selectedListId={this.state.selectedListId}
                    context={this.props.context}
                    onScopeChange={this.onScopeChange}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.actionsSection}>
                  <div className={styles.sectionHeader}>
                    <h3>User Custom Actions</h3>
                    <CommandBarButton
                      iconProps={{ iconName: 'Add' }}
                      text='Create New'
                      onClick={this._openCreatePanel}
                      primary={true}
                      className={styles.createButton}
                    />
                  </div>
                  {this.state.isLoading ? (
                    <div className={styles.loadingMessage}>{strings.Loading}</div>
                  ) : (
                    <div>
                      {this.state.userCustomActions.length > 0 ? (
                        <div>
                          <div className={`${this._gridStyles} ${styles.actionsGrid}`}>
                            {this.state.userCustomActions.map(action => (
                              <div key={action.Id} className={`${this._cardContainerStyles} ${styles.actionCard}`}>
                                <DocumentCard
                                  className={this._cardStyles}
                                  onClickHref={undefined}
                                  onClick={() => this._viewUserCustomAction(action)}
                                >
                                  <DocumentCardTitle
                                    title={action.Title || action.Name || 'Untitled Action'}
                                    shouldTruncate={true}
                                  />
                                  <div style={{ padding: '12px 16px 8px 16px' }}>
                                    <div className={this._locationBadgeStyles}>
                                      {action.Location}
                                    </div>
                                    {action.Description && (
                                      <div style={{
                                        fontSize: '12px',
                                        color: '#605e5c',
                                        marginTop: '8px',
                                        lineHeight: '16px'
                                      }}>
                                        {action.Description}
                                      </div>
                                    )}
                                    <div style={{
                                      fontSize: '11px',
                                      color: '#a19f9d',
                                      marginTop: '8px',
                                      fontStyle: 'italic'
                                    }}>
                                      Click to view details
                                    </div>
                                  </div>
                                  <DocumentCardActions
                                    actions={[
                                      {
                                        iconProps: { iconName: 'View' },
                                        onClick: (ev) => {
                                          if (ev) {
                                            ev.preventDefault();
                                          }
                                          this._viewUserCustomAction(action);
                                        },
                                        ariaLabel: 'View action'
                                      },
                                      {
                                        iconProps: { iconName: 'Edit' },
                                        onClick: (ev) => {
                                          if (ev) {
                                            ev.preventDefault();
                                          }
                                          this._editUserCustomAction(action);
                                        },
                                        ariaLabel: 'Edit action'
                                      },
                                      {
                                        iconProps: { iconName: 'Delete' },
                                        onClick: (ev) => {
                                          if (ev) {
                                            ev.preventDefault();
                                          }
                                          this._deleteUserCustomAction(action);
                                        },
                                        ariaLabel: 'Delete action'
                                      }
                                    ]}
                                  />
                                </DocumentCard>
                              </div>
                            ))}
                          </div>
                          <UserCustomActionEditPanel
                            userCustomAction={this.state.editCustomAction}
                            context={this.props.context}
                            scope={this.state.scope}
                            selectedListId={this.state.selectedListId}
                            isCreateMode={false}
                            templates={this.props.actions}
                            service={this._service}
                            onUserCustomActionSaved={() => this.readDataAndSetState()}
                            PanelClosed={() => this.setState({ editCustomAction: undefined })}
                          />
                          <UserCustomActionEditPanel
                            context={this.props.context}
                            scope={this.state.scope}
                            selectedListId={this.state.selectedListId}
                            isCreateMode={this.state.createCustomAction}
                            onUserCustomActionSaved={() => this.readDataAndSetState()}
                            PanelClosed={() => this.setState({ createCustomAction: false })}
                          />
                          <UserCustomActionViewPanel
                            userCustomAction={this.state.viewCustomAction}
                            PanelClosed={() => this.setState({ viewCustomAction: undefined })}
                          />
                        </div>
                      ) : (
                        <div className={styles.emptyMessage}>
                          {this.state.scope === UserCustomActionScope.List && !this.state.selectedListId ? (
                            <span>{strings.PleaseSelectList}</span>
                          ) : (
                            <span>{strings.NoUserCustomActionsFound}</span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RestrictedContainer>
      </div>
    );
  }

  private onScopeChange = (scope: UserCustomActionScope, listId?: string): void => {
    this.setState({
      scope: scope,
      selectedListId: listId,
      editCustomAction: undefined,
      viewCustomAction: undefined,
      createCustomAction: false
    });
  }

  private _openCreatePanel = (): void => {
    console.log('_openCreatePanel called'); // Debug log
    this.setState({
      createCustomAction: true,
      editCustomAction: undefined,
      viewCustomAction: undefined
    });
  }

  private _deleteUserCustomAction = (action: IUserCustomActionProps): void => {
    if (window.confirm(strings.ConfirmDelete.replace('#title#', action.Title))) {
      this._service.deleteUserCustomAction(this.state.scope, action, this.state.selectedListId).then(() => {
        this.readDataAndSetState();
      });
    }
  }

  private _editUserCustomAction = (action: IUserCustomActionProps): void => {
    this.setState({
      editCustomAction: action,
      viewCustomAction: undefined,
      createCustomAction: false
    });
  }

  private _viewUserCustomAction = (action: IUserCustomActionProps): void => {
    // If clicking on the same action that's already being viewed, close the panel
    if (this.state.viewCustomAction && this.state.viewCustomAction.Id === action.Id) {
      this.setState({ viewCustomAction: undefined });
    } else {
      // Otherwise, show the clicked action's details and close any edit panel
      this.setState({
        viewCustomAction: action,
        editCustomAction: undefined,
        createCustomAction: false
      });
    }
  }

  private async readDataAndSetState(): Promise<void> {
    this.setState({ isLoading: true });

    try {
      // If List scope is selected but no list is chosen, don't load data yet
      if (this.state.scope === UserCustomActionScope.List && !this.state.selectedListId) {
        this.setState({ userCustomActions: [], isLoading: false });
        return;
      }

      const actions: IUserCustomActionProps[] = await this._service.getUserCustomActions(this.state.scope, this.state.selectedListId);
      this.setState({ userCustomActions: actions, isLoading: false });
    } catch (error) {
      console.error('Error loading user custom actions:', error);
      this.setState({ userCustomActions: [], isLoading: false });
    }
  }
}
