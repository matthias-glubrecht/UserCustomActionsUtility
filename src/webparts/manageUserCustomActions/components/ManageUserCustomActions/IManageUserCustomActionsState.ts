import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';

export interface IManageUserCustomActionsState {
    scope: UserCustomActionScope;
    userCustomActions: IUserCustomActionProps[];
    isLoading: boolean;
    editCustomAction: IUserCustomActionProps | null;
    viewCustomAction: IUserCustomActionProps | null;
}