import { NextFunctionComponent } from "next";

type MenuIconProps = {
  onClick: (event?: any) => void,
  className: string,
}

const MenuIcon: NextFunctionComponent<MenuIconProps> = ({ onClick, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className} onClick={onClick}>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

export default MenuIcon;
