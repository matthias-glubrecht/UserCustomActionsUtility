import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { IListInfo } from './IListInfo';

export interface IScopeSelectorState {
    selectedScope: UserCustomActionScope;
    selectedListId?: string;
    availableLists: IListInfo[];
    isLoadingLists: boolean;
}