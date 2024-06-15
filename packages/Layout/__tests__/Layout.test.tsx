import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '..';

describe('Layout', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sidebar>Sidebar</Layout.Sidebar>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    render(
      <Layout className="custom-layout">
        <Layout.Header className="custom-layout-header">Header</Layout.Header>
        <Layout>
          <Layout.Sidebar className="custom-layout-sidebar">
            Sidebar
          </Layout.Sidebar>
          <Layout.Content className="custom-layout-content">
            Content
          </Layout.Content>
        </Layout>
        <Layout.Footer className="custom-layout-footer">Footer</Layout.Footer>
      </Layout>
    );
    expect(screen.getAllByTestId('layout')[0]).toHaveClass('custom-layout');
    expect(screen.getByTestId('layoutHeader')).toHaveClass(
      'custom-layout-header'
    );
    expect(screen.getByTestId('layoutSidebar')).toHaveClass(
      'custom-layout-sidebar'
    );
    expect(screen.getByTestId('layoutContent')).toHaveClass(
      'custom-layout-content'
    );
    expect(screen.getByTestId('layoutFooter')).toHaveClass(
      'custom-layout-footer'
    );
  });

  test('should detect the sidebar as children', () => {
    render(
      <Layout>
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sidebar>Sidebar</Layout.Sidebar>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    );
    expect(screen.getAllByTestId('layout')[1]).toHaveClass(
      'raw-layout-has-sidebar'
    );
  });
});
