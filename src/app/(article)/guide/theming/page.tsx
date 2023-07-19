import { Metadata } from 'next';
import MDXContent from './mdx-content';

export const metadata: Metadata = {
  title: 'Theming - Raw UI',
};

export default function Page() {
  return <MDXContent />;
}
