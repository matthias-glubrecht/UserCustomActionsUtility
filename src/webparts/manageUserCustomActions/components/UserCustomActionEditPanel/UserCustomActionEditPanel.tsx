// tslint:disable:max-line-length export-name no-any typedef
import * as React from 'react';
import { IUserCustomActionEditPanelProps } from './IUserCustomActionEditPanelProps';
import { Label, TextField, Dropdown, IDropdownOption, PrimaryButton, DefaultButton } from 'office-ui-fabric-react';

import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';
import { userCustomActionProps, UserCustomActionLocation } from '../../Utility/UserCustomActionHelper';
import styles from './UserCustomActionEditPanel.module.scss';
import { IUserCustomActionEditPanelState } from './IUserCustomActionEditPanelState';
import { UserCustomActionService } from '../../services/UserCustomActionService/UserCustomActionService';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';
// import strings = require('IManageUserCustomActionsWebPartStrings');

export class UserCustomActionEditPanel extends React.Component<IUserCustomActionEditPanelProps, IUserCustomActionEditPanelState> {
  private _userCustomActionService: UserCustomActionService;

  public constructor(props: IUserCustomActionEditPanelProps) {
    super(props);

    this._userCustomActionService = new UserCustomActionService(this.props.context);

    // Initialize state based on mode (create vs edit)
    const isCreateMode: boolean = this.props.isCreateMode === true;
    const initialAction: IUserCustomActionProps | undefined = this.props.userCustomAction;

    this.state = {
      userCustomAction: initialAction || {} as IUserCustomActionProps,
      isEditing: isCreateMode,
      isSaving: false,
      validationErrors: {},
      formData: initialAction ? { ...initialAction } : {},
      selectedLocation: initialAction ? initialAction.Location as UserCustomActionLocation : undefined
    };
  }

  public componentWillReceiveProps(nextProps: IUserCustomActionEditPanelProps): void {
    if (nextProps.userCustomAction !== this.props.userCustomAction) {
      const initialAction: IUserCustomActionProps | undefined = nextProps.userCustomAction;
      this.setState({
        userCustomAction: initialAction || {} as IUserCustomActionProps,
        formData: initialAction ? { ...initialAction } : {},
        selectedLocation: initialAction ? initialAction.Location as UserCustomActionLocation : undefined,
        isEditing: nextProps.isCreateMode === true || !nextProps.userCustomAction,
        validationErrors: {}
      });
    }
  }

  public render(): React.ReactElement<IUserCustomActionEditPanelProps> {
    // Determine if this is create mode vs edit mode
    const isCreateMode: boolean = this.props.isCreateMode === true;
    const isEditMode: boolean = this.props.isCreateMode === false && !!this.props.userCustomAction;
    const isOpen: boolean = isCreateMode || isEditMode;
    const title: string = isCreateMode ? 'Create New User Custom Action' : 'Edit User Custom Action';

    // Debug logging
    console.log('EditPanel render:', {
      isCreateMode: this.props.isCreateMode,
      hasUserCustomAction: !!this.props.userCustomAction,
      isOpen,
      title
    });

    // Get location options for dropdown
    const locationOptions: IDropdownOption[] = Object.keys(UserCustomActionLocation).map(key => ({
      key: UserCustomActionLocation[key as keyof typeof UserCustomActionLocation],
      text: UserCustomActionLocation[key as keyof typeof UserCustomActionLocation]
    }));

    // Get properties for the selected location
    const currentProperties: string[] = this.state.selectedLocation ?
      userCustomActionProps[this.state.selectedLocation] || [] : [];

    return (
      <Panel isOpen={isOpen} position={PanelPosition.Right} onDismiss={this.onPanelClosed} width={600}>
        {isOpen &&
          <div className={styles.editPanel}>
            <div className={styles.header}>
              <h1>{title}</h1>
              {!isCreateMode && this.props.scope && (
                <div className={styles.scopeInfo}>
                  <strong>Scope:</strong> {this.props.scope}
                  {this.props.scope === UserCustomActionScope.List && this.props.selectedListId && (
                    <div><strong>List ID:</strong> {this.props.selectedListId}</div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.formSection}>
              {/* Location dropdown - only editable in create mode */}
              <div className={styles.field}>
                {isCreateMode ? (
                  <Dropdown
                    label='Location (Type)'
                    placeHolder='Select a location'
                    options={locationOptions}
                    selectedKey={this.state.selectedLocation}
                    onChanged={this._onLocationChanged}
                    required={true}
                    errorMessage={this.state.validationErrors.Location}
                  />
                ) : (
                  <div>
                    <Label>Location</Label>
                    <span className={styles.readOnlyValue}>{this.state.userCustomAction.Location}</span>
                  </div>
                )}
              </div>

              {/* Dynamic fields based on selected location */}
              {this.state.selectedLocation && currentProperties.map(property => (
                <div key={property} className={styles.field}>
                  {this._renderField(property)}
                </div>
              ))}

              {/* ID field - read-only in edit mode */}
              {!isCreateMode && this.state.userCustomAction.Id && (
                <div className={styles.field}>
                  <Label>ID</Label>
                  <span className={styles.readOnlyValue}>{this.state.userCustomAction.Id}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className={styles.buttonRow}>
              <PrimaryButton
                text={isCreateMode ? 'Create' : 'Save'}
                onClick={this._onSave}
                disabled={this.state.isSaving || !this.state.selectedLocation}
              />
              <DefaultButton
                text='Cancel'
                onClick={this.onPanelClosed}
                disabled={this.state.isSaving}
              />
            </div>

            {this.state.isSaving && (
              <div className={styles.loading}>
                {isCreateMode ? 'Creating user custom action...' : 'Saving changes...'}
              </div>
            )}
          </div>
        }
      </Panel>
    );
  }

  private onPanelClosed = () => {
    this.props.PanelClosed();
  }

  private _onLocationChanged = (option: IDropdownOption): void => {
    this.setState({
      selectedLocation: option.key as UserCustomActionLocation,
      formData: {}, // Reset form data when location changes
      validationErrors: {}
    });
  }

  private _onFieldChanged = (property: string, value: any): void => {
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [property]: value
      },
      validationErrors: {
        ...prevState.validationErrors,
        [property]: undefined // Clear validation error when user types
      }
    }));
  }

  private _renderField = (property: string): JSX.Element => {
    const value: string = this.state.formData[property] || '';
    const errorMessage: string = this.state.validationErrors[property];

    // Handle special fields
    switch (property) {
      case 'ClientSideComponentProperties':
        return (
          <TextField
            label={property}
            value={value}
            multiline={true}
            rows={4}
            onChanged={(newValue) => this._onFieldChanged(property, newValue)}
            errorMessage={errorMessage}
          />
        );

      case 'Rights':
        return (
          <div>
            <Label>{property}</Label>
            <TextField
              value={value}
              onChanged={(newValue) => this._onFieldChanged(property, newValue)}
              errorMessage={errorMessage}
              placeholder='e.g., AddListItems, EditListItems'
            />
            <small>Enter permission levels (comma-separated)</small>
          </div>
        );

      case 'Sequence':
        return (
          <TextField
            label={property}
            type='number'
            value={value}
            onChanged={(newValue) => this._onFieldChanged(property, newValue)}
            errorMessage={errorMessage}
          />
        );

      default:
        return (
          <TextField
            label={property}
            value={value}
            onChanged={(newValue) => this._onFieldChanged(property, newValue)}
            errorMessage={errorMessage}
          />
        );
    }
  }

  private _onSave = async (): Promise<void> => {
    if (!this._validateForm()) {
      return;
    }

    this.setState({ isSaving: true });

    try {
      const isCreateMode: boolean = this.props.isCreateMode === true;
      const userCustomActionData: any = {
        Location: this.state.selectedLocation,
        Title: this.state.formData.Title || '',
        ...this.state.formData
      };

      if (isCreateMode) {
        await this._userCustomActionService.addUserCustomAction(
          this.props.scope,
          userCustomActionData as IUserCustomActionProps,
          this.props.selectedListId
        );
      } else {
        await this._userCustomActionService.updateUserCustomAction(
          this.props.scope,
          { ...this.props.userCustomAction, ...userCustomActionData } as IUserCustomActionProps,
          this.props.selectedListId
        );
      }

      if (this.props.onUserCustomActionSaved) {
        this.props.onUserCustomActionSaved();
      }
      this.props.PanelClosed();
    } catch (error) {
      console.error('Error saving user custom action:', error);
      // Handle error (show notification, etc.)
    } finally {
      this.setState({ isSaving: false });
    }
  }

  private _validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    let isValid: boolean = true;

    if (!this.state.selectedLocation) {
      errors.Location = 'Location is required';
      isValid = false;
    }

    if (this.state.selectedLocation) {
      const requiredProperties: string[] = userCustomActionProps[this.state.selectedLocation];
      if (requiredProperties) {
        requiredProperties.forEach(property => {
          const value: any = this.state.formData[property];
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            errors[property] = `${property} is required`;
            isValid = false;
          }
        });
      }
    }

    this.setState({ validationErrors: errors });
    return isValid;
  }
}
