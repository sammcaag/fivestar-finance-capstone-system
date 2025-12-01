import { SecurityFormValues, SecurityPayload } from "../types/security-types";

export const securityPayload = (data: SecurityFormValues, oldEmail: string): SecurityPayload => {
  return {
    oldEmail: oldEmail,
    newEmail: data.email,
    oldPassword: data.oldPassword,
    newPassword: data.confirmNewPassword,
  };
};

export const mapBackendToSecurityFormValues = (email: string): SecurityFormValues => {
  return {
    email: email,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
};
