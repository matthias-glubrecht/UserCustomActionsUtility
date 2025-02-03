// tslint:disable:max-line-length
// tslint:disable:export-name
import { UserCustomActionAddResult, UserCustomActions } from '@pnp/sp/src/usercustomactions';
import { IUserCustomActionService } from './IUserCustomActionService';
import { sp } from '@pnp/sp';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { UserCustomActionScope } from './UserCustomActionScope';
import { IUserCustomActionProps } from './IUserCustomActionProps';

export class UserCustomActionService implements IUserCustomActionService {
    constructor(context: WebPartContext) {
        sp.setup({
            spfxContext: context
        });
     }
    public async getUserCustomActions(scope: UserCustomActionScope): Promise<IUserCustomActionProps[]> {
        try {
            let actions: UserCustomActions | IUserCustomActionProps[];
            switch (scope) {
                case UserCustomActionScope.Web:
                    actions = await sp.web.userCustomActions.get();
                    break;
                case UserCustomActionScope.Site:
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

    public async getUserCustomActionById(scope: UserCustomActionScope, id: string): Promise<IUserCustomActionProps> {
        try {
            switch (scope) {
                case UserCustomActionScope.Web:
                    return sp.web.userCustomActions.getById(id) as unknown as IUserCustomActionProps;
                case UserCustomActionScope.Site:
                    return sp.site.userCustomActions.getById(id) as unknown as IUserCustomActionProps;
                default:
                    throw new Error('Invalid scope');
            }
        } catch (error) {
            console.error('Error getting user custom action by ID: ', error);
            throw error;
        }
    }

    public async addUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<UserCustomActionAddResult> {
        try {
            switch (scope) {
                case UserCustomActionScope.Web:
                    return sp.web.userCustomActions.add(customAction);
                case UserCustomActionScope.Site:
                    return sp.site.userCustomActions.add(customAction);
                default:
                    throw new Error('Invalid scope');
            }
        } catch (error) {
            console.error('Error adding user custom action: ', error);
            throw error;
        }
    }

    public async updateUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<IUserCustomActionProps> {
        try {
            switch (scope) {
                case UserCustomActionScope.Web:
                    throw new Error('Method not implemented.');
                case UserCustomActionScope.Site:
                    throw new Error('Method not implemented.');
                default:
                    throw new Error('Invalid scope');
            }
        } catch (error) {
            console.error('Error updating user custom action: ', error);
            throw error;
        }
    }

    public async deleteUserCustomAction(scope: UserCustomActionScope, customAction: IUserCustomActionProps): Promise<void> {
        try {
            switch (scope) {
                case UserCustomActionScope.Web:
                    return sp.web.userCustomActions.getById(customAction.Id).delete();
                case UserCustomActionScope.Site:
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
