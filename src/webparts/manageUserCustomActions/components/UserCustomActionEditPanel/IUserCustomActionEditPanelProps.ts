import { IUserCustomActionService } from '../../services/UserCustomActionService/IUserCustomActionService';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';

export interface IUserCustomActionEditPanelProps {
  userCustomAction: IUserCustomActionProps;
  templates: IUserCustomActionProps[];
  PanelClosed: () => void;
  service: IUserCustomActionService;
}
