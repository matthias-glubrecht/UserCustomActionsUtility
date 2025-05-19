// tslint:disable:max-line-length export-name variable-name
import * as React from 'react';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { IScopeSelectorProps } from './IScopeSelectorProps';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import * as strings from 'ManageUserCustomActionsWebPartStrings';
import styles from './ScopeSelector.module.scss';

export const ScopeSelector: React.StatelessComponent<IScopeSelectorProps> = (props: IScopeSelectorProps) => {
    return (
        <div className={styles.scopeSelector}>
            <label className={styles.label}>{`${strings.SelectUserCustomActionScope}:`}</label>
            <ChoiceGroup className={styles.choices} selectedKey={props.selectedScope}
                         onChange={(ev, option) => props.onScopeChange(option.key as UserCustomActionScope)}
                options={[
                    { key: UserCustomActionScope.Web, text: strings.Website },
                    { key: UserCustomActionScope.Site, text: strings.SiteCollection }
                ]}>
            </ChoiceGroup>
        </div>
    );
};
