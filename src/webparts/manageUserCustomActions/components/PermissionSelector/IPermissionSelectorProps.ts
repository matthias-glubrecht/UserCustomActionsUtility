import { SPPermission } from '@microsoft/sp-page-context';
import { IODataBasePermission } from '../../Utility/Utility';

export interface IPermissionSelectorProps {
    selectedPermission: IODataBasePermission;
    onChange: (selectedPermissions: SPPermission) => void;
    disabled?: boolean;
}