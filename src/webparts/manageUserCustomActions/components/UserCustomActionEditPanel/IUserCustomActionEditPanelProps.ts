import { IUserCustomActionService } from '../../services/UserCustomActionService/IUserCustomActionService';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';

export interface IUserCustomActionEditPanelProps {
  userCustomAction?: IUserCustomActionProps; // Optional for create mode
  templates?: IUserCustomActionProps[];
  context: WebPartContext;
  scope: UserCustomActionScope;
  selectedListId?: string;
  isCreateMode?: boolean; // New prop to distinguish create vs edit
  PanelClosed: () => void;
  onUserCustomActionSaved?: () => void; // Callback for when action is saved
  service?: IUserCustomActionService;
}
