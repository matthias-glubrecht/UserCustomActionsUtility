// tslint:disable:max-line-length export-name
import * as React from 'react';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { IScopeSelectorProps } from './IScopeSelectorProps';
import { IScopeSelectorState } from './IScopeSelectorState';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as strings from 'ManageUserCustomActionsWebPartStrings';
import styles from './ScopeSelector.module.scss';

export default class ScopeSelector extends React.Component<IScopeSelectorProps, IScopeSelectorState> {
    constructor(props: IScopeSelectorProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.setState({ selectedScope: this.props.selectedScope });
    }

    public render(): React.ReactElement<IScopeSelectorProps> {
        return (
            <div className={styles.scopeSelector}>
                <label className={styles.label} htmlFor='scopeSelector'>{`${strings.SelectUserCustomActionScope}:`}</label>
                <ChoiceGroup className={styles.choices} selectedKey={this.props.selectedScope} onChange={(ev, option) => this.props.onScopeChange(option.key as UserCustomActionScope)}
                  options={[
                    { key: UserCustomActionScope.Web, text:  strings.Website },
                    { key: UserCustomActionScope.Site, text: strings.SiteCollection }
                  ]}>
                  </ChoiceGroup>
            </div>
        );
    }

    private handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
        this.props.onScopeChange(event.target.value as UserCustomActionScope);
    }
}
