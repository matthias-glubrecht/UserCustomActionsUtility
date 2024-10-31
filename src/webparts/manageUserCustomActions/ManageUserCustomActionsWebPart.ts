import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ManageUserCustomActionsWebPartStrings';
import ManageUserCustomActions from './components/ManageUserCustomActions';
import { IManageUserCustomActionsProps } from './components/IManageUserCustomActionsProps';

export interface IManageUserCustomActionsWebPartProps {
  description: string;
}

export default class ManageUserCustomActionsWebPart extends BaseClientSideWebPart<IManageUserCustomActionsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IManageUserCustomActionsProps > = React.createElement(
      ManageUserCustomActions,
      {
        description: this.properties.description,
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
