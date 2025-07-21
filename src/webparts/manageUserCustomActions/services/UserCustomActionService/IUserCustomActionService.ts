/* tslint:disable:max-line-length */
import { UserCustomActionScope } from './UserCustomActionScope';
import { IUserCustomActionProps } from './IUserCustomActionProps';
import { UserCustomActionAddResult } from '@pnp/sp';

export interface IUserCustomActionService {
    getUserCustomActions(scope: UserCustomActionScope, listId?: string): Promise<IUserCustomActionProps[]>;
    getUserCustomActionById(scope: UserCustomActionScope, id: string, listId?: string): Promise<IUserCustomActionProps>;
    addUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps, listId?: string): Promise<UserCustomActionAddResult>;
    updateUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps, listId?: string): Promise<IUserCustomActionProps>;
    deleteUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps, listId?: string): Promise<void>;
}