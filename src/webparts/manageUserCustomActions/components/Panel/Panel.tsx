// tslint:disable:max-line-length no-null-keyword no-any
import * as React from 'react';
import { Layer, IconButton } from 'office-ui-fabric-react';
import * as classnames from 'classnames';

import styles from './Panel.module.scss';

export enum PanelPosition {
    Left,
    Right
}

export interface IPanelProps {
    isOpen?: boolean;
    position?: PanelPosition;
    onDismiss?: () => void;
}

export interface IPanelState {
    isOpen?: boolean;
    isVisible?: boolean;
}

export default class Panel extends React.Component<IPanelProps, IPanelState> {

    private _onCloseTimer: number;

    public constructor(props: IPanelProps, state: IPanelState) {
        super(props, state);

        this.state = {
            isOpen: this.props.isOpen
        };
    }

    public componentWillReceiveProps(newProps: IPanelProps): void {
        if (newProps.isOpen === this.props.isOpen) {
            return;
        }
        //
        // From https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Modal/Modal.tsx
        //
        clearTimeout(this._onCloseTimer);

        if (newProps.isOpen) {
            if (!this.state.isOpen) {
                this.setState({
                    isOpen: true
                });
            } else {
                this.setState({
                    isVisible: true
                });
            }
        }

        if (!newProps.isOpen && this.state.isOpen) {
            this._close();
        }
    }

    public componentDidUpdate(prevProps: IPanelProps, prevState: IPanelState): void {
        if (!prevProps.isOpen && !prevState.isVisible && this.state.isOpen) {
            setTimeout(this._onOpen, 45); // just to set open class a little bit later to have animation
        }
    }

    public render(): JSX.Element {
        if (!this.state.isOpen) {
            return null;
        }
        const optionalClasses: any = {};
        optionalClasses[styles.visible] = this.state.isVisible;
        optionalClasses[styles.right] = true;
        const className: string = classnames(styles.panel, optionalClasses);

        return (
            <Layer>
                <div data-id='ucaPanel' className={className}>
                    <div className={styles.header}>
                        <div className={styles.closeButton}>
                            <IconButton
                                iconProps={{ iconName: 'Cancel' }}
                                onClick={this.onDismiss} />
                        </div>
                        <div className={styles.clear}></div>
                    </div>
                    <div className={styles.content}>
                        {this.props.children}
                    </div>
                </div>
            </Layer>);
    }

    private onDismiss = () => {
        this._close();
    }

    private _close = () => {
        this.registerCloseHandlers(false);
        this._onCloseTimer = setTimeout(this._onClose, parseFloat(styles.duration));
        this.setState({
            isVisible: false
        });
    }

    private _onOpen = () => {
        this.setState({
            isVisible: true
        });
        this.registerCloseHandlers(true);
    }

    private _onClose = () => {
        this.setState({
            isOpen: false
        });

        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    private registerCloseHandlers(register: boolean): void {
        if (register) {
            console.log('Click handler registered');
            document.addEventListener('click', this.panelCloser);
            document.addEventListener('keydown', this.keyDown);
        } else {
            document.removeEventListener('click', this.panelCloser);
            document.removeEventListener('keydown', this.keyDown);
            console.log('Click handler unregistered');
        }
    }

    private panelCloser = (event: MouseEvent): void => {
        const className: string = styles.panel;
        const target: HTMLElement = event.target as HTMLElement;
        if (!target.closest(`div.${className}`)) {
            this._close();
        }
    }

    private keyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            this._close();
        }
    }
}