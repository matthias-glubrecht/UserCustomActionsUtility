declare interface IManageUserCustomActionsWebPartStrings {
  WebPartTitle: string;
  WebPartTitleFieldLabel: string;
  WebPartTitleFieldDescription: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  NoAccess: string;
  NoUserCustomActionsFound: string;
  SelectUserCustomActionScope: string;
  Website: string;
  SiteCollection: string;
  Loading: string;
  Name: string;
  Location: string;
  Edit: string;
  Delete: string;
  ConfirmDelete: string;
}

declare module 'ManageUserCustomActionsWebPartStrings' {
  const strings: IManageUserCustomActionsWebPartStrings;
  export = strings;
}
