/* tslint:disable:export-name */

import * as React from 'react';
import { IRestrictedContainerProps } from './IRestrictedContainerProps';
import { IRestrictedContainerState } from './IRestrictedContainerState';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPWeb } from '@microsoft/sp-page-context';
import { Utility } from '../../Utility/Utility';

export default class RestrictedContainer extends React.Component<IRestrictedContainerProps, IRestrictedContainerState> {
    constructor(props: IRestrictedContainerProps) {
        super(props);
        this.state = {
            UserHasRequiredPermission: false
        };
    }

    public componentDidMount(): void {
        const mode: string = Utility.GetQueryStringParameter('mode');
        if (mode === 'user') {
            this.setState({
                UserHasRequiredPermission: false
            });
        } else {
            const spContext: WebPartContext = this.props.Context;
            const spWeb: SPWeb = spContext.pageContext.web;

            this.setState({
                UserHasRequiredPermission: spWeb.permissions.hasPermission(this.props.RequiredPermissions)
            });
        }
    }

    public render(): React.ReactElement<IRestrictedContainerProps> {
        if (this.state.UserHasRequiredPermission) {
            return (
                <div >{this.props.children}</div >
            );
        } else if (this.props.NoAccessMessage) {
            return (
                <div >{this.props.NoAccessMessage}</div >
            );
        } else {
            return undefined;
        }
    }
}
