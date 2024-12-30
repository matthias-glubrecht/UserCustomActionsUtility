// tslint:disable:max-line-length
/* tslint:disable:export-name */

import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IUserCustomActionCreateDialogProps } from './IUserCustomActionCreateDialogProps';
import { IUserCustomActionCreateDialogState } from './IUserCustomActionCreateDialogState';
import { IModalProps } from 'office-ui-fabric-react/lib/Modal';
import styles from '../ManageUserCustomActions/ManageUserCustomActions.module.scss';

export default class UserCustomActionCreateDialog extends React.Component<IUserCustomActionCreateDialogProps, IUserCustomActionCreateDialogState> {
    constructor(props: IUserCustomActionCreateDialogProps) {
        super(props);
        this.state = {
            hideDialog: true
        };
    }

    public render(): React.ReactElement<{}> {
        const props: IModalProps = {
            className: styles.dialog,
            isBlocking: true,
            isDarkOverlay: false,
            containerClassName: styles.dialogContainer
        };

        const btnText: string = this.state.hideDialog ? 'Dialog anzeigen' : 'Dialog schließen';

        return (
            <div>
                <PrimaryButton text={btnText} onClick={this._toggleShowDialog} />
                <Dialog hidden={this.state.hideDialog}
                    onDismiss={this._toggleShowDialog}
                    dialogContentProps={
                        {
                            type: DialogType.close,
                            title: 'Meinem Dialog',
                            subText: 'This is an example of using the Dialog component from office-ui-fabric-react.',
                            className: styles.dialog
                        }
                    }
                    modalProps={props}
                >
                    <div>
                        <h1>Neue User Custom Action anlegen</h1>
                        <h2>Geht noch nicht</h2>
                    </div>
                    <DialogFooter>
                        <PrimaryButton onClick={this._toggleShowDialog} text='Schließen' />
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