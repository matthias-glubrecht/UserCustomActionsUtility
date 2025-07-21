import { IUserCustomActionProps } from '../../services/UserCustomActionService/IUserCustomActionProps';
import { UserCustomActionLocation } from '../../Utility/UserCustomActionHelper';

// tslint:disable:no-any
export interface IUserCustomActionEditPanelState {
  userCustomAction: IUserCustomActionProps;
  isEditing: boolean;
  isSaving: boolean;
  validationErrors: { [key: string]: string };
  formData: { [key: string]: any };
  selectedLocation?: UserCustomActionLocation;
}