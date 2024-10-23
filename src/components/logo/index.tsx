import { NavLink } from 'react-router-dom';

import logo from '@/assets/icons/ic-logo.svg';

interface Props {
  size?: number | string;
}
function Logo({ size = 50 }: Props) {
  return (
    <NavLink to="/">
      <img src={logo} height={size} width={size} alt="logo" />
    </NavLink>
  );
}

export default Logo;
