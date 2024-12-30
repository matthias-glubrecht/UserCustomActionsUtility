import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';

export interface IUserCustomActionEditDialogProps {
    userCustomAction: IUserCustomActionProps;
    context: WebPartContext;
}