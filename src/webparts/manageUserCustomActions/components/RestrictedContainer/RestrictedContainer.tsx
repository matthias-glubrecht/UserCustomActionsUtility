import * as React from 'react';
import { IRestrictedContainerProps } from './IRestrictedContainerProps';
import { IRestrictedContainerState } from './IRestrictedContainerState';
import { SPPermission } from '@microsoft/sp-page-context';

export default class RestrictedContaner extends React.Component<IRestrictedContainerProps, IRestrictedContainerState> {
    constructor(props: IRestrictedContainerProps) {
        super(props);
        this.state = {
            UserHasRequiredPermission: false
        };
    }

    public componentDidMount() {
        // Check if the current user has the required permission
        // and set the state accordingly
        // Inititialize the sp context
        const spContext = this.props.Context;
        // Get the current user
        const currentUser = spContext.pageContext.user;
        // Check if the current user has the required permission
        const spWeb = spContext.pageContext.web;


        this.setState({
            UserHasRequiredPermission: spWeb.permissions.hasPermission(this.props.RequiredPermissions)
        });
    }


    public render(): React.ReactElement<IRestrictedContainerProps> {
        if (this.state.UserHasRequiredPermission) {
            return (
                <div >{this.props.children}</div >
            );
        }
        else if (this.props.NoAccessMessage) {
            return (
                <div >{this.props.NoAccessMessage}</div >
            );
        }
        else {
            return undefined;
        }
    }
}
