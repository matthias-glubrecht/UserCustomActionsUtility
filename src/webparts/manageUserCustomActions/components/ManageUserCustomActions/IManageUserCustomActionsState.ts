import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';

export interface IManageUserCustomActionsState {
    scope: UserCustomActionScope;
    selectedListId?: string;
    userCustomActions: IUserCustomActionProps[];
    isLoading: boolean;
    editCustomAction: IUserCustomActionProps | null;
    viewCustomAction: IUserCustomActionProps | null;
    createCustomAction: boolean; // Add this for create mode
}