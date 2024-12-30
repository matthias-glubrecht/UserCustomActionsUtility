import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPPermission } from '@microsoft/sp-page-context';

export interface IRestrictedContainerProps {
    Context: WebPartContext;
    RequiredPermissions: SPPermission;
    NoAccessMessage?: string;
}