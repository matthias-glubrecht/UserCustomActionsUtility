// tslint:disable:max-line-length
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

import * as strings from 'ManageUserCustomActionsWebPartStrings';
import ManageUserCustomActions from './components/ManageUserCustomActions/ManageUserCustomActions';
import { IManageUserCustomActionsProps } from './components/ManageUserCustomActions/IManageUserCustomActionsProps';
import { IUserCustomActionProps } from './services/UserCustomActionService/IUserCustomActionProps';

export interface IManageUserCustomActionsWebPartProps {
  actions: IUserCustomActionProps[];
}

export default class ManageUserCustomActionsWebPart extends BaseClientSideWebPart<IManageUserCustomActionsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IManageUserCustomActionsProps > = React.createElement(
      ManageUserCustomActions,
      {
        actions: this.properties.actions,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyFieldCollectionData('actions', {
                  key: 'actions',
                  label: 'Vordefinierte User Custom Actions',
                  panelHeader: 'Konfiguration der Aktionen',
                  manageBtnLabel: 'Aktionen konfigurieren',
                  value: this.properties.actions,
                  fields: [
                    {
                      id: 'title',
                      title: 'Name',
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: 'description',
                      title: 'Beschreibung',
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: 'location',
                      title: 'Ort',
                      type: CustomCollectionFieldType.dropdown,
                      required: true,
                      defaultValue: '',
                      options: [
                        {
                          key: 'Microsoft.SharePoint.SiteSettings',
                          text: 'Microsoft.SharePoint.SiteSettings'
                        },
                        {
                          key: 'ClientSideExtension.ApplicationCustomizer',
                          text: 'ClientSideExtension.ApplicationCustomizer'
                        },
                        {
                          key: 'Microsoft.SharePoint.ListEdit',
                          text: 'Microsoft.SharePoint.ListEdit'
                        }
                      ]
                    },
                    {
                      id: 'scriptSrc',
                      title: 'Script Source',
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: 'scriptBlock',
                      title: 'Script Block',
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: 'url',
                      title: 'Url',
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: 'sequence',
                      title: 'Reihenfolge',
                      type: CustomCollectionFieldType.number
                    },
                    {
                      id: 'group',
                      title: 'Gruppe',
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: 'scriptBlock',
                      title: 'Farbe',
                      type: CustomCollectionFieldType.dropdown,
                      required: true,
                      defaultValue: '#0061A7',
                      options: [
                        {
                          key: '#C9E0EE',
                          text: 'Hemdblau'
                        },
                        {
                          key: '#F18700',
                          text: 'Orange'
                        },
                        {
                          key: '#0061A7',
                          text: 'Polizeiblau'
                        },
                        {
                          key: '#D9DADA',
                          text: 'Silbergrau'
                        }
                      ]
                    },
                    {
                      id: 'target',
                      title: 'Ziel',
                      type: CustomCollectionFieldType.dropdown,
                      defaultValue: '_parent',
                      options: [
                        {
                          key: '_parent',
                          text: 'gleiches Fenster'
                        },
                        {
                          key: '_target',
                          text: 'neues Fenster'
                        }
                      ],
                      required: true
                    }
                  ],
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
