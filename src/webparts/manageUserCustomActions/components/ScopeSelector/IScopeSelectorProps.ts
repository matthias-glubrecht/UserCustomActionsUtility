import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';

export interface IScopeSelectorProps {
    selectedScope: UserCustomActionScope;
    onScopeChange: (scope: UserCustomActionScope) => void;
}