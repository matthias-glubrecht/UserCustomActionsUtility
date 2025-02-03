import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';

export interface IUserCustomActionViewPanelProps {
  PanelClosed: () => void;
  userCustomAction: IUserCustomActionProps;
}
