import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IScopeSelectorProps {
    selectedScope: UserCustomActionScope;
    selectedListId?: string;
    context: WebPartContext;
    onScopeChange: (scope: UserCustomActionScope, listId?: string) => void;
}