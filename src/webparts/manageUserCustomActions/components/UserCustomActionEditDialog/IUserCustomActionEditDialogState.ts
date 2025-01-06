import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';

export interface IUserCustomActionEditDialogState {
    userCustomAction: IUserCustomActionProps;
    hideDialog: boolean;
}