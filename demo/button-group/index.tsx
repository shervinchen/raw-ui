import React from 'react';
import Unit from '../Unit';
import { Button } from '@/packages';

export function DemoButtonGroupTypes() {
  return (
    <Unit layout="col">
      <Button.Group>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="primary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="success">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="warning">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="error">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </Unit>
  );
}

export function DemoButtonGroupSizes() {
  return (
    <Unit layout="col">
      <Button.Group size="xs">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group size="sm">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group size="md">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group size="lg">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group size="xl">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </Unit>
  );
}

export function DemoButtonGroupVariantOutline({ title }: { title: string }) {
  return (
    <Unit title={title} layout="col">
      <Button.Group type="primary" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="success" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="warning" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="error" variant="outline">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </Unit>
  );
}

export function DemoButtonGroupVariantGhost({ title }: { title: string }) {
  return (
    <Unit title={title} layout="col">
      <Button.Group variant="ghost">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="primary" variant="ghost">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="success" variant="ghost">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="warning" variant="ghost">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
      <Button.Group type="error" variant="ghost">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </Unit>
  );
}

export function DemoButtonGroupVertical() {
  return (
    <Unit layout="row">
      <Button.Group vertical>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </Unit>
  );
}

export function DemoButtonGroupDisabled() {
  return (
    <Unit layout="row">
      <Button.Group disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </Button.Group>
    </Unit>
  );
}
