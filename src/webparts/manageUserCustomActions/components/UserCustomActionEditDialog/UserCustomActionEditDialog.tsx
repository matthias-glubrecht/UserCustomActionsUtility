// tslint:disable:max-line-length
/* tslint:disable:export-name */

import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton, BaseButton, Button } from 'office-ui-fabric-react/lib/Button';
import { IUserCustomActionEditDialogProps } from './IUserCustomActionEditDialogProps';
import { IUserCustomActionEditDialogState } from './IUserCustomActionEditDialogState';
import { IModalProps } from 'office-ui-fabric-react/lib/Modal';
import styles from '../ManageUserCustomActions/ManageUserCustomActions.module.scss';
import { MouseEventHandler } from 'react';

export default class UserCustomActionEditDialog extends React.Component<IUserCustomActionEditDialogProps, IUserCustomActionEditDialogState> {
    private _save: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | BaseButton | Button>;
    constructor(props: IUserCustomActionEditDialogProps) {
        super(props);
        this.state = {
            hideDialog: true,
            userCustomAction: this.props.userCustomAction
        };
    }

    public render(): React.ReactElement<{}> {
        const props: IModalProps = {
            className: styles.dialog,
            isBlocking: true,
            isDarkOverlay: false,
            containerClassName: styles.dialogContainer
        };

        return (
            <div>
                <Dialog hidden={this.state.hideDialog}
                    onDismiss={this._toggleShowDialog}
                    dialogContentProps={
                        {
                            type: DialogType.close,
                            title: 'UserCustomAction bearbeiten',
                            subText: 'Hier könnte Ihre Werbung stehen.',
                            className: styles.dialog
                        }
                    }
                    modalProps={props}
                >
                    <div>
                        <h1>{this.props.userCustomAction.Title}</h1>
                        <h2>Weitere Eigenschaften folgen</h2>
                    </div>
                    <DialogFooter>
                        <PrimaryButton onClick={this._save} text='Speichern' />
                        <DefaultButton onClick={this._toggleShowDialog} text='Abbrechen' />
                    </DialogFooter>
                </Dialog>
            </div>
        );
    }

    private _toggleShowDialog = () => {
        this.setState({ hideDialog: !this.state.hideDialog });
    }
}