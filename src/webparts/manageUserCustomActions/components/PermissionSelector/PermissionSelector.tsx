// tslint:disable:export-name

import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IPermissionSelectorProps } from './IPermissionSelectorProps';
import { Utility } from '../../Utility/Utility';
import * as strings from 'ManageUserCustomActionsWebPartStrings';

export default class PermissionSelector extends React.Component<IPermissionSelectorProps, {}> {

    public render(): React.ReactElement<IPermissionSelectorProps> {
        const options: IDropdownOption[] = Utility.AllPermissionNames.map(permission => ({
            key: permission,
            text: permission
        }));

        return (
            <div>
                <Dropdown
                    label={strings.Permissions}
                    selectedKeys={this.getSelectedPermissionKeys()}
                    onChanged={this.onSelectionChanged}
                    multiSelect
                    options={options}
                />
            </div>
        );
    }

    private onSelectionChanged = (option: IDropdownOption): void => {
        const selectedPermissions: string[] = this.getSelectedPermissionKeys();
        if (option.selected) {
            selectedPermissions.push(option.key.toString());
        } else {
            selectedPermissions.splice(selectedPermissions.indexOf(option.key.toString()), 1);
        }

        this.props.onChange(Utility.StringArrayToSPPermission(selectedPermissions));
    }

    private getSelectedPermissionKeys(): string[] {
        return Utility.SPPermissionToArray(this.props.selectedPermission);
    }
}