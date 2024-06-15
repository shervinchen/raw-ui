import Layout from './Layout';
import Header from './Header';
import Content from './Content';
import Sidebar from './Sidebar';
import Footer from './Footer';

export type LayoutComponentType = typeof Layout & {
  Header: typeof Header;
  Content: typeof Content;
  Sidebar: typeof Sidebar;
  Footer: typeof Footer;
};

(Layout as LayoutComponentType).Header = Header;
(Layout as LayoutComponentType).Content = Content;
(Layout as LayoutComponentType).Sidebar = Sidebar;
(Layout as LayoutComponentType).Footer = Footer;

export default Layout as LayoutComponentType;
