import { Metadata } from 'next';
import MDXContent from './mdx-content';

export const metadata: Metadata = {
  title: 'Loading - Raw UI',
};

export default function Page() {
  return <MDXContent />;
}
