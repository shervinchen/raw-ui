import { Metadata } from 'next';
import MDXContent from './mdx-content';

export const metadata: Metadata = {
  title: 'Layout - Raw UI',
};

export default function Page() {
  return <MDXContent />;
}
