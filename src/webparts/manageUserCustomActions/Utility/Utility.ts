// tslint:disable:export-name
// tslint:disable:no-bitwise
// tslint:disable:variable-name
import { SPPermission } from '@microsoft/sp-page-context';

export default class Utility {
    public static readonly AllPermissionNames: string[] = [
        'viewListItems',
        'addListItems',
        'editListItems',
        'deleteListItems',
        'approveItems',
        'openItems',
        'viewVersions',
        'deleteVersions',
        'cancelCheckout',
        'managePersonalViews',
        'manageLists',
        'viewFormPages',
        'open',
        'viewPages',
        'layoutsPage',
        'addAndCustomizePages',
        'applyThemeAndBorder',
        'applyStyleSheets',
        'viewUsageData',
        'createSSCSite',
        'manageSubwebs',
        'createGroups',
        'managePermissions',
        'browseDirectories',
        'browserUserInfo',
        'addDelPrivateWebParts',
        'updatePersonalWebParts',
        'manageWeb',
        'useClientIntegration',
        'useRemoteAPIs',
        'manageAlerts',
        'createAlerts',
        'editMyUserInfo',
        'enumeratePermissions'
    ];

    public static UserCustomActionPropNames: string[] = [
        'Id',
        'Title',
        'Description',
        'Location',
        'ScriptSrc',
        'ScriptBlock',
        'Url',
        'Sequence',
        'Group',
        'ImageUrl',
        'CommandUIExtension',
        'RegistrationType',
        'RegistrationId',
        'Rights',
        'Scope',
        'ClientSideComponentId',
        'ClientSideComponentProperties'
    ];

    public static GetQueryStringParameter(key: string): string {
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }

    public static PermissionToString(permission: SPPermission): string {
        if (permission.hasPermission(SPPermission.fullMask)) {
            return 'fullMask';
        } else if (permission.value.High === 0 && permission.value.Low === 0) {
            return 'emptyMask';
        } else {
            const permissionsAsStringArray: string[] =
                Utility.AllPermissionNames.filter(p => permission.hasPermission(SPPermission[p]));
            return permissionsAsStringArray.join(', ');
        }
    }

    public static ParsePermission(permissionString: string): SPPermission {
        if (permissionString === 'fullMask') {
            return SPPermission.fullMask;
        } else if (permissionString === 'emptyMask') {
            return new SPPermission({ Low: 0, High: 0 });
        } else {
            const permissions: SPPermission[] = permissionString.split(',').map(p => SPPermission[p]);
            return this.CombinePermissions(permissions);
        }
    }

    public static CombinePermissions(permissions: SPPermission[]): SPPermission {
        return new SPPermission({
            Low: permissions.reduce((acc, perm) => acc | perm.value.Low, 0),
            High: permissions.reduce((acc, perm) => acc | perm.value.High, 0)
        });
    }
}