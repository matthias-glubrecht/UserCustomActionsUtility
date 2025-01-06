/* tslint:disable:max-line-length */
import { UserCustomActionScope } from './UserCustomActionScope';
import { IUserCustomActionProps } from './IUserCustomActionProps';
import { UserCustomActionAddResult } from '@pnp/sp';

export interface IUserCustomActionService {
    getUserCustomActions(scope: UserCustomActionScope): Promise<IUserCustomActionProps[]>;
    getUserCustomActionById(scope: UserCustomActionScope, id: string): Promise<IUserCustomActionProps>;
    addUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<UserCustomActionAddResult>;
    updateUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<IUserCustomActionProps>;
    deleteUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<void>;
}