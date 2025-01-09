import { WebPartContext } from '@microsoft/sp-webpart-base';
import {PanelPosition} from '../Panel/Panel';

export interface IEditPanelProps {
  IsOpen: boolean;
  panelPosition?: PanelPosition;
  PanelClosed: () => void;
  UserIsAdmin: boolean;
  Context: WebPartContext;
}
