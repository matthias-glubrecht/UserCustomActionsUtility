// tslint:disable:export-name, max-line-length
// tslint:disable:no-bitwise
// tslint:disable:variable-name
import { SPPermission } from '@microsoft/sp-page-context';

export interface IODataBasePermission {
    Low: number;
    High: number;
}

export class Utility {
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
        'Name',
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

    public static UserCustomActionLocations: string[] = [
        'EditControlBlock',
        'ClientSideExtension.ApplicationCustomizer',
        'ClientSideExtension.ListViewCommandSet.CommandBar',
        'ClientSideExtension.ListViewCommandSet.ContextMenu',
        'ClientSideExtension.ListViewCommandSet',
        'ScriptLink',
        'SiteActions',
        'Microsoft.SharePoint.SiteSettings',
        'Microsoft.SharePoint.StandardMenu'
    ];

    public static SPPermissionToArray(dbPermission: IODataBasePermission): string[] {
        const permission: SPPermission = new SPPermission(dbPermission);
        if (permission.hasPermission(SPPermission.fullMask)) {
            return ['fullMask'];
        } else if (permission.value.High === 0 && permission.value.Low === 0) {
            return ['emptyMask'];
        } else {
            return Utility.AllPermissionNames.filter(p => permission.hasPermission(SPPermission[p]));
        }
    }

    public static GetQueryStringParameter(key: string): string {
        const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
    }

    public static PermissionToString(permission: IODataBasePermission): string {
        const permissionsAsStringArray: string[] = this.SPPermissionToArray(permission);
        return permissionsAsStringArray.join(', ');
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

    public static StringArrayToSPPermission(permissions: string[]): SPPermission {
        const spPermissions: SPPermission[] = permissions.map(p => SPPermission[p]);
        return this.CombinePermissions(spPermissions);
    }

    public static CombinePermissions(permissions: SPPermission[]): SPPermission {
        return new SPPermission({
            Low: permissions.reduce((acc, perm) => acc | perm.value.Low, 0),
            High: permissions.reduce((acc, perm) => acc | perm.value.High, 0)
        });
    }

/*
    const fetchJson = async (url, options) => (await fetch(url, options)).json();

async function getDigest(site) {
    const resObj = await fetchJson(site + '/_api/contextinfo', {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        credentials: 'include',
    });

    return resObj.FormDigestValue;
}

function fieldUrl(site, listName, fieldName) {
    return `${site}/_api/web/lists/getbytitle('${listName}')/fields/getbyinternalnameortitle('${fieldName}')`;
}

async function setClientSideComponent(site, listName, fieldName, digest, customizerId, customizerProperties) {
    const data = { '__metadata': { 'type': 'SP.Field' } };

    if (customizerId) {
        data.ClientSideComponentId = customizerId;
    }
    if (customizerProperties) {
        data.ClientSideComponentProperties = JSON.stringify(customizerProperties);
    }

    const resp = await fetch(
        fieldUrl(site, listName, fieldName),
        {
            method: "POST",
            headers: {
                "X-RequestDigest": digest,
                "content-type": "application/json;odata=verbose",
                "X-HTTP-Method": "MERGE",
            },
            body: JSON.stringify(data),
            credentials: 'include',
        },
    );

    return resp.status;
}

async function getField(site, listName, fieldName) {
    const resObj = await fetchJson(
        fieldUrl(site, listName, fieldName),
        {
            credentials: 'include',
            headers: {
                Accept: 'application/json;odata=verbose',
            },
        },
    );

    return resObj.d;
}

async function setAndCheckClientSideComponent(site, listName, fieldName, customizerId, customizerProperties) {
    try {
        const digest = await getDigest(site);

        const status = await setClientSideComponent(site, listName, fieldName, digest, customizerId, customizerProperties);

        if (!/2\d\d/.test(status)) {
            throw new Error(`Error code ${status} received attempting to change field settings.`);
        }

        console.log('Finished setting field settings with status code:', status);
        const field = await getField(site, listName, fieldName);

        console.log('Field settings retrieved:');
        console.log('  ClientSideComponentId:', field.ClientSideComponentId);
        console.log('  ClientSideComponentProperties:', field.ClientSideComponentProperties);
    } catch (error) {
        console.error(error);
    }
}

async function setCustomAction(site, listName, componentId, componentProperties, customActionId, title = '', description = '') {
    try {
        const digest = await getDigest(site);

        const urlBase = `${site}/_api/web/lists/getbytitle('${listName}')/UserCustomActions`;
        const url = customActionId ? `${urlBase}('${customActionId}')` : urlBase;

        const body = JSON.stringify({
            '__metadata': { 'type': 'SP.UserCustomAction' },
            Location: 'ClientSideExtension.ListViewCommandSet.CommandBar',
            Title: title,
            Description: description,
            ClientSideComponentId: componentId,
            ClientSideComponentProperties: JSON.stringify(componentProperties),
        });
        const headers = {
            'X-RequestDigest': digest,
            "content-type": "application/json;odata=verbose",
        };

        const fullHeaders = {
            ...headers,
            ...(customActionId ? { "X-HTTP-Method": "MERGE" } : {}),
        };

        await fetch(
            url,
            {
                method: 'POST',
                body,
                headers,
                credentials: 'include',
            },
        );
    } catch (error) {
        console.error(error);
    }
}
    */
}