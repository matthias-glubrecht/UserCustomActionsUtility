import { WebPartContext } from '@microsoft/sp-webpart-base';
import {PanelPosition} from '../Panel/Panel';

export interface IViewPanelProps {
  IsOpen: boolean;
  panelPosition?: PanelPosition;
  PanelClosed: () => void;
  Context: WebPartContext;
}
