// tslint:disable:max-line-length no-any

/*export interface IUserCustomActionLocation {
    Location: string;
    Parameters: string[];
}
    */

const userCustomActionLocations: string[] = [
    'EditControlBlock',
    'DisplayFormToolbar',
    'EditFormToolbar',
    'NewFormToolbar',
    'Microsoft.SharePoint.SiteSettings',
    'Ribbon.Documents.Actions',
    'Ribbon.ListItem.Actions',
    'ScriptLink',
    'SiteActions',
    'CommandUI.Ribbon',
    'ClientSideExtension.ListViewCommandSet',
    'ClientSideExtension.ApplicationCustomizer',
    'ClientSideExtension.FieldCustomizer'
];

const userCustomActionProps: any = {
    'EditControlBlock': [
        'RegistrationType',
        'RegistrationId',
        'Sequence',
        'Title',
        'UrlAction',
        'ImageUrl',
        'Rights',
        'Description',
        'Name'
    ],
    'DisplayFormToolbar': [
        'RegistrationType',
        'RegistrationId',
        'Sequence',
        'Title',
        'UrlAction',
        'ImageUrl',
        'Rights',
        'Description',
        'Name'
    ],
    'EditFormToolbar': [
        'RegistrationType',
        'RegistrationId',
        'Sequence',
        'Title',
        'UrlAction',
        'ImageUrl',
        'Rights',
        'Description',
        'Name'
    ],
    'NewFormToolbar': [
        'RegistrationType',
        'RegistrationId',
        'Sequence',
        'Title',
        'UrlAction',
        'ImageUrl',
        'Rights',
        'Description',
        'Name'
    ],
    'Microsoft.SharePoint.SiteSettings': [
        'GroupId',
        'Sequence',
        'Title',
        'UrlAction',
        'Rights',
        'Description',
        'Name'
    ],
    'Ribbon.Documents.Actions': [
        'Sequence',
        'CommandUIExtension',
        'RegistrationType',
        'RegistrationId',
        'Rights',
        'Description',
        'Name'
    ],
    'Ribbon.ListItem.Actions': [
        'Sequence',
        'CommandUIExtension',
        'RegistrationType',
        'RegistrationId',
        'Rights',
        'Description',
        'Name'
    ],
    'ScriptLink': [
        'ScriptSrc',
        'ScriptBlock',
        'Sequence',
        'Rights',
        'Description',
        'Name'
    ],
    'SiteActions': [
        'GroupId',
        'Sequence',
        'Title',
        'UrlAction',
        'Rights',
        'Description',
        'Name'
    ],
    'CommandUI.Ribbon': [
        'CommandUIExtension',
        'Sequence',
        'RegistrationType',
        'RegistrationId',
        'Rights',
        'Description',
        'Name'
    ],
    'ClientSideExtension.ListViewCommandSet': [
        'ClientSideComponentId',
        'ClientSideComponentProperties',
        'Title',
        'Description',
        'Name'
    ],
    'ClientSideExtension.ApplicationCustomizer': [
        'ClientSideComponentId',
        'ClientSideComponentProperties',
        'Title',
        'Description',
        'Name'
    ],
    'ClientSideExtension.FieldCustomizer': [
        'ClientSideComponentId',
        'ClientSideComponentProperties',
        'Title',
        'Description',
        'Name',
        'RegistrationId',
        'RegistrationType'
    ]
};

export {
    userCustomActionLocations,
    userCustomActionProps
};