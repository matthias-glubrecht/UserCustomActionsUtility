import { SPPermission } from '@microsoft/sp-page-context';

export interface IUserCustomActionProps {
    Id?: string;
    Title: string;
    Description?: string;
    Location: string;
    ScriptSrc?: string;
    ScriptBlock?: string;
    Url?: string;
    Sequence?: number;
    Group?: string;
    ImageUrl?: string;
    CommandUIExtension?: string;
    RegistrationType?: number;
    RegistrationId?: string;
    Rights?: SPPermission;
    Scope?: number;
    ClientSideComponentId?: string;
    ClientSideComponentProperties?: string;
}