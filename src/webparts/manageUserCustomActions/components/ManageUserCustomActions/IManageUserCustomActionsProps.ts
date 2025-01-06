import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IManageUserCustomActionsProps {
  context: WebPartContext;
  webPartTitle: string;
  updateTitle: (title: string) => void;
  actions: IUserCustomActionProps[];
  displayMode: DisplayMode;
}
