// tslint:disable:max-line-length
// tslint:disable:export-name
import { UserCustomActionAddResult, UserCustomActions } from '@pnp/sp/src/usercustomactions';
import { IUserCustomActionService } from './IUserCustomActionService';
import { sp } from '@pnp/sp';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { UserCustomActionScope } from './UserCustomActionScope';
import { IUserCustomActionProps } from './IUserCustomActionProps';

export class UserCustomActionService implements IUserCustomActionService {
    public async getUserCustomActions(context: WebPartContext, scope: UserCustomActionScope): Promise<IUserCustomActionProps[]> {
        try {
            let actions: UserCustomActions | IUserCustomActionProps[];
            switch (scope) {
                case 'web':
                    actions = await sp.web.userCustomActions.get();
                    break;
                case 'site':
                    actions = await sp.site.userCustomActions.get();
                    break;
                default:
                    throw new Error('Invalid scope');
            }
            return actions as IUserCustomActionProps[];
        } catch (error) {
            console.error('Error getting user custom actions: ', error);
            throw error;
        }
    }

    public async getUserCustomActionById(context: WebPartContext, scope: UserCustomActionScope, id: string): Promise<IUserCustomActionProps> {
        try {
            switch (scope) {
                case 'web':
                    return sp.web.userCustomActions.getById(id) as unknown as IUserCustomActionProps;
                case 'site':
                    return sp.site.userCustomActions.getById(id) as unknown as IUserCustomActionProps;
                default:
                    throw new Error('Invalid scope');
            }
        } catch (error) {
            console.error('Error getting user custom action by ID: ', error);
            throw error;
        }
    }

    public async addUserCustomAction(context: WebPartContext, scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<UserCustomActionAddResult> {
        try {
            switch (scope) {
                case 'web':
                    return sp.web.userCustomActions.add(customAction);
                case 'site':
                    return sp.site.userCustomActions.add(customAction);
                default:
                    throw new Error('Invalid scope');
            }
        } catch (error) {
            console.error('Error adding user custom action: ', error);
            throw error;
        }
    }

    public async updateUserCustomAction(context: WebPartContext, scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<IUserCustomActionProps> {
        try {
            switch (scope) {
                case 'web':
                    throw new Error('Method not implemented.');
                case 'site':
                    throw new Error('Method not implemented.');
                default:
                    throw new Error('Invalid scope');
            }
        } catch (error) {
            console.error('Error updating user custom action: ', error);
            throw error;
        }
    }

    public async deleteUserCustomAction(context: WebPartContext, scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<void> {
        try {
            switch (scope) {
                case 'web':
                    return sp.web.userCustomActions.getById(customAction.Id).delete();
                case 'site':
                    return sp.site.userCustomActions.getById(customAction.Id).delete();
                default:
                    throw new Error('Invalid scope');
            }
        } catch (error) {
            console.error('Error deleting user custom action: ', error);
            throw error;
        }
    }
}