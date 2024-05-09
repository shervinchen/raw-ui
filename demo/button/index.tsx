import React from 'react';
import { Search } from 'react-feather';
import Unit from '../Unit';
import { Button } from '@/packages';

export function DemoButtonTypes() {
  return (
    <Unit layout="row">
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </Unit>
  );
}

export function DemoButtonSizes() {
  return (
    <Unit layout="row">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Unit>
  );
}

export function DemoButtonVariantOutline({ title }: { title: string }) {
  return (
    <Unit title={title} layout="row">
      <Button type="primary" variant="outline">
        Primary
      </Button>
      <Button type="success" variant="outline">
        Success
      </Button>
      <Button type="warning" variant="outline">
        Warning
      </Button>
      <Button type="error" variant="outline">
        Error
      </Button>
    </Unit>
  );
}

export function DemoButtonVariantGhost({ title }: { title: string }) {
  return (
    <Unit title={title} layout="row">
      <Button variant="ghost">Default</Button>
      <Button type="primary" variant="ghost">
        Primary
      </Button>
      <Button type="success" variant="ghost">
        Success
      </Button>
      <Button type="warning" variant="ghost">
        Warning
      </Button>
      <Button type="error" variant="ghost">
        Error
      </Button>
    </Unit>
  );
}

export function DemoButtonVariantShadow({ title }: { title: string }) {
  return (
    <Unit title={title} layout="row">
      <Button variant="shadow">Default</Button>
      <Button type="primary" variant="shadow">
        Primary
      </Button>
      <Button type="success" variant="shadow">
        Success
      </Button>
      <Button type="warning" variant="shadow">
        Warning
      </Button>
      <Button type="error" variant="shadow">
        Error
      </Button>
    </Unit>
  );
}

export function DemoButtonLoading() {
  return (
    <Unit layout="row">
      <Button loading>Default</Button>
      <Button type="primary" loading>
        Primary
      </Button>
      <Button type="success" variant="outline" loading>
        Success
      </Button>
      <Button type="warning" variant="ghost" loading>
        Warning
      </Button>
      <Button type="error" variant="shadow" loading>
        Error
      </Button>
    </Unit>
  );
}

export function DemoButtonDisabled() {
  return (
    <Unit layout="row">
      <Button disabled>Default</Button>
      <Button type="primary" disabled>
        Primary
      </Button>
      <Button type="primary" variant="outline" disabled>
        Outline
      </Button>
      <Button type="primary" variant="ghost" disabled>
        Ghost
      </Button>
      <Button type="primary" variant="shadow" disabled>
        Shadow
      </Button>
    </Unit>
  );
}

export function DemoButtonIcon() {
  return (
    <Unit layout="row">
      <Button icon={<Search />} />
      <Button icon={<Search />}>Search</Button>
      <Button iconRight={<Search />}>Search</Button>
      <Button type="primary" icon={<Search />} />
      <Button type="primary" icon={<Search />}>
        Search
      </Button>
    </Unit>
  );
}
