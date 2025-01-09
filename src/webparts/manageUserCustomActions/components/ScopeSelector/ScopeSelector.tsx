import * as React from 'react';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { IScopeSelectorProps } from './IScopeSelectorProps';
import { IScopeSelectorState } from './IScopeSelectorState';
import * as strings from 'ManageUserCustomActionsWebPartStrings';
import styles from './ScopeSelector.module.scss';

class ScopeSelector extends React.Component<IScopeSelectorProps, IScopeSelectorState> {
    constructor(props: IScopeSelectorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setState({ selectedScope: this.props.selectedScope });
    }

    handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        this.props.onScopeChange(event.target.value as UserCustomActionScope);
    }

    public render(): React.ReactElement<IScopeSelectorProps> {
        return (
            <div className={styles.scopeSelector}>
                <label htmlFor="scopeSelector">Select Scope:</label>
                <select id="scopeSelector" value={this.props.selectedScope} onChange={this.handleChange}>
                    <option value={UserCustomActionScope.Site}>{strings.SiteCollection}</option>
                    <option value={UserCustomActionScope.Web}>{strings.Website}</option>
                </select>
            </div>
        );
    }
}

export default ScopeSelector;