import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';

export interface IManageUserCustomActionsProps {
  context: WebPartContext;
  actions: IUserCustomActionProps[];
}
