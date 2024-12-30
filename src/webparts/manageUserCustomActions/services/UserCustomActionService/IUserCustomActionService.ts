/* tslint:disable:max-line-length */
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { UserCustomActionScope } from './UserCustomActionScope';
import { IUserCustomActionProps } from './IUserCustomActionProps';
import { UserCustomActionAddResult } from '@pnp/sp';

export interface IUserCustomActionService {
    getUserCustomActions(context: WebPartContext, scope: UserCustomActionScope): Promise<IUserCustomActionProps[]>;
    getUserCustomActionById(context: WebPartContext, scope: UserCustomActionScope, id: string): Promise<IUserCustomActionProps>;
    addUserCustomAction(context: WebPartContext, scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<UserCustomActionAddResult>;
    updateUserCustomAction(context: WebPartContext, scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<IUserCustomActionProps>;
    deleteUserCustomAction(context: WebPartContext, scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<void>;
}