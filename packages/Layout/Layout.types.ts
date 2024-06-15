import { HTMLAttributes } from 'react';

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

type NativeLayoutProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  keyof BaseLayoutProps
>;

type NativeHeaderProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof BaseHeaderProps
>;

type NativeContentProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof BaseContentProps
>;

type NativeFooterProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof BaseFooterProps
>;

type NativeSidebarProps = Omit<
  HTMLAttributes<HTMLElement>,
  keyof BaseSidebarProps
>;

export type LayoutProps = BaseLayoutProps & NativeLayoutProps;
export type HeaderProps = BaseHeaderProps & NativeHeaderProps;
export type ContentProps = BaseContentProps & NativeContentProps;
export type FooterProps = BaseFooterProps & NativeFooterProps;
export type SidebarProps = BaseSidebarProps & NativeSidebarProps;
