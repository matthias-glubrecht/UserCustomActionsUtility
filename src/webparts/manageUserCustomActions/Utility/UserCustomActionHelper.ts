// tslint:disable:max-line-length no-any

/*export interface IUserCustomActionLocation {
    Location: string;
    Parameters: string[];
}
    */

export enum UserCustomActionLocation {
    ClientSideExtensionApplicationCustomizer = 'ClientSideExtension.ApplicationCustomizer',
    ClientSideExtensionFieldCustomizer = 'ClientSideExtension.FieldCustomizer',
    ClientSideExtensionListViewCommandSet = 'ClientSideExtension.ListViewCommandSet',
    CommandUIRibbon = 'CommandUI.Ribbon',
    DisplayFormToolbar = 'DisplayFormToolbar',
    EditControlBlock = 'EditControlBlock',
    EditFormToolbar = 'EditFormToolbar',
    MicrosoftSharePointSiteSettings = 'Microsoft.SharePoint.SiteSettings',
    NewFormToolbar = 'NewFormToolbar',
    RibbonDocumentsActions = 'Ribbon.Documents.Actions',
    RibbonListItemActions = 'Ribbon.ListItem.Actions',
    ScriptLink = 'ScriptLink',
    SiteActions = 'SiteActions'
}

export type UserCustomActionLocationKey = keyof typeof UserCustomActionLocation;

const userCustomActionLocations: string[] = [
    UserCustomActionLocation.ClientSideExtensionApplicationCustomizer,
    UserCustomActionLocation.ClientSideExtensionFieldCustomizer,
    UserCustomActionLocation.ClientSideExtensionListViewCommandSet,
    UserCustomActionLocation.CommandUIRibbon,
    UserCustomActionLocation.DisplayFormToolbar,
    UserCustomActionLocation.EditControlBlock,
    UserCustomActionLocation.EditFormToolbar,
    UserCustomActionLocation.MicrosoftSharePointSiteSettings,
    UserCustomActionLocation.NewFormToolbar,
    UserCustomActionLocation.RibbonDocumentsActions,
    UserCustomActionLocation.RibbonListItemActions,
    UserCustomActionLocation.ScriptLink,
    UserCustomActionLocation.SiteActions
];

const userCustomActionProps: {[k in UserCustomActionLocation]: string[]} = {
    [UserCustomActionLocation.ClientSideExtensionApplicationCustomizer]: [
        'ClientSideComponentId',
        'ClientSideComponentProperties',
        'Title',
        'Description',
        'Name'
    ],
    [UserCustomActionLocation.ClientSideExtensionFieldCustomizer]: [
        'ClientSideComponentId',
        'ClientSideComponentProperties',
        'Title',
        'Description',
        'Name',
        'RegistrationId',
        'RegistrationType'
    ],
    [UserCustomActionLocation.ClientSideExtensionListViewCommandSet]: [
        'ClientSideComponentId',
        'ClientSideComponentProperties',
        'Title',
        'Description',
        'Name'
    ],
    [UserCustomActionLocation.CommandUIRibbon]: [
        'CommandUIExtension',
        'Sequence',
        'RegistrationType',
        'RegistrationId',
        'Rights',
        'Description',
        'Name'
    ],
    [UserCustomActionLocation.DisplayFormToolbar]: [
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
    [UserCustomActionLocation.EditControlBlock]: [
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
    [UserCustomActionLocation.EditFormToolbar]: [
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
    [UserCustomActionLocation.MicrosoftSharePointSiteSettings]: [
        'GroupId',
        'Sequence',
        'Title',
        'UrlAction',
        'Rights',
        'Description',
        'Name'
    ],
    [UserCustomActionLocation.NewFormToolbar]: [
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
    [UserCustomActionLocation.RibbonDocumentsActions]: [
        'Sequence',
        'CommandUIExtension',
        'RegistrationType',
        'RegistrationId',
        'Rights',
        'Description',
        'Name'
    ],
    [UserCustomActionLocation.RibbonListItemActions]: [
        'Sequence',
        'CommandUIExtension',
        'RegistrationType',
        'RegistrationId',
        'Rights',
        'Description',
        'Name'
    ],
    [UserCustomActionLocation.ScriptLink]: [
        'ScriptSrc',
        'ScriptBlock',
        'Sequence',
        'Rights',
        'Description',
        'Name'
    ],
    [UserCustomActionLocation.SiteActions]: [
        'GroupId',
        'Sequence',
        'Title',
        'UrlAction',
        'Rights',
        'Description',
        'Name'
    ]
};

export {
    userCustomActionLocations,
    userCustomActionProps
};