// tslint:disable:max-line-length export-name variable-name
import * as React from 'react';
import { UserCustomActionScope } from '../../services/UserCustomActionService/UserCustomActionScope';
import { IScopeSelectorProps } from './IScopeSelectorProps';
import { IScopeSelectorState } from './IScopeSelectorState';
import { IListInfo } from './IListInfo';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as strings from 'ManageUserCustomActionsWebPartStrings';
import styles from './ScopeSelector.module.scss';
import { sp } from '@pnp/sp';

export class ScopeSelector extends React.Component<IScopeSelectorProps, IScopeSelectorState> {

    constructor(props: IScopeSelectorProps) {
        super(props);

        this.state = {
            selectedScope: this.props.selectedScope,
            selectedListId: this.props.selectedListId,
            availableLists: [],
            isLoadingLists: false
        };

        // Setup PnPjs
        sp.setup({
            spfxContext: this.props.context
        });
    }

    public componentDidMount(): void {
        if (this.props.selectedScope === UserCustomActionScope.List) {
            this.loadLists();
        }
    }

    public componentDidUpdate(prevProps: IScopeSelectorProps): void {
        if (prevProps.selectedScope !== this.props.selectedScope && this.state.selectedScope !== this.props.selectedScope) {
            this.setState({ selectedScope: this.props.selectedScope });
        }

        if (prevProps.selectedListId !== this.props.selectedListId && this.state.selectedListId !== this.props.selectedListId) {
            this.setState({ selectedListId: this.props.selectedListId });
        }

        if (this.props.selectedScope === UserCustomActionScope.List && this.state.availableLists.length === 0 && !this.state.isLoadingLists) {
            this.loadLists();
        }
    }

    public render(): React.ReactElement<IScopeSelectorProps> {
        return (
            <div className={styles.scopeSelector}>
                <label className={styles.label}>{`${strings.SelectUserCustomActionScope}:`}</label>
                <div className={styles.scopeContainer}>
                    <div className={styles.radioButtonsContainer}>
                        <ChoiceGroup
                            className={styles.choices}
                            selectedKey={this.props.selectedScope}
                            onChange={this.onScopeChange}
                            options={[
                                { key: UserCustomActionScope.Web, text: strings.Website },
                                { key: UserCustomActionScope.Site, text: strings.SiteCollection },
                                { key: UserCustomActionScope.List, text: strings.List }
                            ]}
                        />
                    </div>
                    {this.props.selectedScope === UserCustomActionScope.List && (
                        <div className={styles.listSelectorContainer}>
                            {this.state.isLoadingLists ? (
                                <Spinner size={SpinnerSize.small} label='Loading lists...' />
                            ) : (
                                <Dropdown
                                    label={strings.SelectList}
                                    options={this.getListOptions()}
                                    selectedKey={this.state.selectedListId}
                                    onChanged={this.onListChange}
                                    placeHolder={strings.SelectList}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private onScopeChange = (ev: React.FormEvent<HTMLInputElement>, option: { key: string }): void => {
        const newScope: UserCustomActionScope = option.key as UserCustomActionScope;

        this.setState({ selectedScope: newScope });

        if (newScope === UserCustomActionScope.List) {
            if (this.state.availableLists.length === 0) {
                this.loadLists();
            }
            // Reset selected list when switching to List scope
            this.setState({ selectedListId: undefined });
            this.props.onScopeChange(newScope, undefined);
        } else {
            // Reset selected list when switching away from List scope
            this.setState({ selectedListId: undefined });
            this.props.onScopeChange(newScope, undefined);
        }
    }

    private onListChange = (option?: IDropdownOption, index?: number): void => {
        if (option) {
            const listId: string = option.key as string;
            this.setState({ selectedListId: listId }, () => {
                this.props.onScopeChange(UserCustomActionScope.List, listId);
            });
        }
    }

    private getListOptions(): IDropdownOption[] {
        return this.state.availableLists.map(list => ({
            key: list.Id,
            text: list.Title
        }));
    }

    private async loadLists(): Promise<void> {
        this.setState({ isLoadingLists: true });

        try {
            const lists: Array<{ Id: string; Title: string }> = await sp.web.lists.select('Id', 'Title').filter('Hidden eq false').get();
            const listInfo: IListInfo[] = lists.map((list: { Id: string; Title: string }) => ({
                Id: list.Id,
                Title: list.Title
            }));

            this.setState({
                availableLists: listInfo,
                isLoadingLists: false
            });
        } catch (error) {
            console.error('Error loading lists:', error);
            this.setState({
                availableLists: [],
                isLoadingLists: false
            });
        }
    }
}
