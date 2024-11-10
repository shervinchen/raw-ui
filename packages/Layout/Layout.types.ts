import { ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

interface BaseLayoutProps {
  className?: string;
}

interface BaseHeaderProps {
  className?: string;
}

interface BaseContentProps {
  className?: string;
}

interface BaseFooterProps {
  className?: string;
}

interface BaseSidebarProps {
  className?: string;
}

export type LayoutProps = Merge<
  ComponentPropsWithoutRef<'div'>,
  BaseLayoutProps
>;
export type HeaderProps = Merge<
  ComponentPropsWithoutRef<'header'>,
  BaseHeaderProps
>;
export type ContentProps = Merge<
  ComponentPropsWithoutRef<'main'>,
  BaseContentProps
>;
export type FooterProps = Merge<
  ComponentPropsWithoutRef<'footer'>,
  BaseFooterProps
>;
export type SidebarProps = Merge<
  ComponentPropsWithoutRef<'aside'>,
  BaseSidebarProps
>;
