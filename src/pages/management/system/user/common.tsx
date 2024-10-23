import ProTag from '@/theme/antd/components/tag';

import { UserStatus } from '#/enum';

export const renderStatusTag = (status: UserStatus) => {
  switch (status) {
    case UserStatus.APPROVED:
      return <ProTag color="success">APPROVED</ProTag>;
    case UserStatus.PENDING:
      return <ProTag color="yellow">PENDING</ProTag>;
    case UserStatus.REJECT:
      return <ProTag color="error">REJECTED</ProTag>;
    default:
      return null;
  }
};
