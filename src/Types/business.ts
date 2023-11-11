interface IBusinessField {
  _id: string;
  type: string;
  address: string;
  cccd: string;
  crn: string;
  dateOfIssue: string;
  name: string;
  placeOfIssue: string;
  taxCode: string;
  organization_name: string;
  description: string;
  phone: string;
  email: string;
  createdAt: string;
  updateAt: string;
  user: IUserField;
}
