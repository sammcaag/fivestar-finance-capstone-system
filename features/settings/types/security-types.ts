export type SecurityFormValues = {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type SecurityPayload = {
  oldEmail: string;
  newEmail: string;
  oldPassword: string;
  newPassword: string;
};
