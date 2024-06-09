import { Metadata } from 'next';
import MDXContent from './mdx-content';

export const metadata: Metadata = {
  title: 'Server Render - Raw UI',
};

export default function Page() {
  return <MDXContent />;
}
