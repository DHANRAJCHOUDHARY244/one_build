export enum BasicStatus {
  DISABLE,
  ENABLE,
}

export enum TransactionType{
  WITHDRAWAL = 'WITHDRAWL',
  DEPOSIT = 'DEPOSIT',
}

export enum UserStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECT = 'REJECT',
}

export enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
  TIMEOUT = 401,
}

export enum StorageEnum {
  User = 'user',
  Token = 'token',
  Settings = 'settings',
  I18N = 'i18nextLng',
  Dashboard = 'dashboard',
  Ledger = 'Ledger',
  LedgerDeposit = 'LedgerDeposit',
  LedgerWithdrawal = 'LedgerWithdrawal',
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark',
}

export enum ThemeLayout {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Mini = 'mini',
}

export enum ThemeColorPresets {
  Default = 'default',
  Cyan = 'cyan',
  Purple = 'purple',
  Blue = 'blue',
  Orange = 'orange',
  Red = 'red',
}

export enum LocalEnum {
  en_US = 'en_US',
}

export enum MultiTabOperation {
  FULLSCREEN = 'fullscreen',
  REFRESH = 'refresh',
  CLOSE = 'close',
  CLOSEOTHERS = 'closeOthers',
  CLOSEALL = 'closeAll',
  CLOSELEFT = 'closeLeft',
  CLOSERIGHT = 'closeRight',
}

export enum PermissionType {
  CATALOGUE,
  MENU,
  BUTTON,
}
