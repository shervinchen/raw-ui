import { ComponentPropsWithoutRef } from 'react';
import { Merge } from '../utils';

export interface BaseLayoutProps {
  className?: string;
}

export interface BaseHeaderProps {
  className?: string;
}

export interface BaseContentProps {
  className?: string;
}

export interface BaseFooterProps {
  className?: string;
}

export interface BaseSidebarProps {
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
