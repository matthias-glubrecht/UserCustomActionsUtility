// tslint:disable:max-line-length
export interface IUserCustomActionLocation {
    Location: string;
    Parameters: string[];
}

export const userCustomActionLocations: IUserCustomActionLocation[] = [
    {
        Location: 'EditControlBlock',
        Parameters: ['RegistrationType', 'RegistrationId', 'Sequence', 'Title', 'UrlAction', 'ImageUrl', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'DisplayFormToolbar',
        Parameters: ['RegistrationType', 'RegistrationId', 'Sequence', 'Title', 'UrlAction', 'ImageUrl', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'EditFormToolbar',
        Parameters: ['RegistrationType', 'RegistrationId', 'Sequence', 'Title', 'UrlAction', 'ImageUrl', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'NewFormToolbar',
        Parameters: ['RegistrationType', 'RegistrationId', 'Sequence', 'Title', 'UrlAction', 'ImageUrl', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'Microsoft.SharePoint.SiteSettings',
        Parameters: ['GroupId', 'Sequence', 'Title', 'UrlAction', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'Ribbon.Documents.Actions',
        Parameters: ['Sequence', 'CommandUIExtension', 'RegistrationType', 'RegistrationId', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'Ribbon.ListItem.Actions',
        Parameters: ['Sequence', 'CommandUIExtension', 'RegistrationType', 'RegistrationId', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'ScriptLink',
        Parameters: ['ScriptSrc', 'ScriptBlock', 'Sequence', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'SiteActions',
        Parameters: ['GroupId', 'Sequence', 'Title', 'UrlAction', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'CommandUI.Ribbon',
        Parameters: ['CommandUIExtension', 'Sequence', 'RegistrationType', 'RegistrationId', 'Rights', 'Description', 'Name']
    },
    {
        Location: 'ClientSideExtension.ListViewCommandSet',
        Parameters: ['ClientSideComponentId', 'ClientSideComponentProperties', 'Title', 'Description', 'Name']
    },
    {
        Location: 'ClientSideExtension.ApplicationCustomizer',
        Parameters: ['ClientSideComponentId', 'ClientSideComponentProperties', 'Title', 'Description', 'Name']
    },
    {
        Location: 'ClientSideExtension.FieldCustomizer',
        Parameters: ['ClientSideComponentId', 'ClientSideComponentProperties', 'Title', 'Description', 'Name', 'RegistrationId', 'RegistrationType']
    }
];
