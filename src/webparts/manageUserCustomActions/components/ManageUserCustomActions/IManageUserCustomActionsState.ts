import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';

export interface IManageUserCustomActionsState {
    scope: 'web' | 'site';
    userCustomActions: IUserCustomActionProps[];
    isLoading: boolean;
    editCustomAction: IUserCustomActionProps | null;
}