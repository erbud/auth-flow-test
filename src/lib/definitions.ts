export type AuthContextType = {
  logged: boolean;
  setLogged: Function;
};
export type SignupInputsType = {
  email: string;
  password: string;
  passwordConfirm: string;
};
export type AuthInputsType = {
  email: string;
  password: string;
};
export type VerifyEmailType = {
  email: string;
  code: string;
};
export type RestorePassType = {
  email: string;
  code: string;
};
export type PassInputsType = {
  password: string;
  passwordConfirm: string;
};
export type EmailInputType = {
  email: string;
};
export type UpdatePassInputsType = {
  email: string;
  password: string;
  code: string;
};
export type SessionType = {
  id: string;
  email: string;
  role: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verified: boolean;
};

export type RootLayoutType = {
  children: React.ReactNode;
  modal?: React.ReactNode;
};
export type SearchParamsType = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type SidebarType = {
  show: boolean;
  setter: Function;
};
export type SidebarItemType = {
  name: string;
  route: string;
  icon: React.ReactNode;
  callback?: Function;
};
export type SidebarButtonType = {
  setter: Function;
};
export type SettingsInputsType = {
  id: string;
  email: string;
  name: string;
};
export type NameInputsType = {
  id: string;
  name: string;
};