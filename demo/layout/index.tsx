import { Grid, Layout, RawUITheme, useTheme } from '@/packages';
import { CSSProperties } from 'react';

export const headerStyle = (theme: RawUITheme): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '64px',
  color: theme.palette.accents6,
  backgroundColor: theme.palette.accents4,
});

export const contentStyle = (theme: RawUITheme): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '120px',
  color: theme.palette.accents4,
  backgroundColor: theme.palette.accents6,
});

export const sidebarStyle = (theme: RawUITheme): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '25%',
  color: theme.palette.accents3,
  backgroundColor: theme.palette.accents5,
});

export const footerStyle = (theme: RawUITheme): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '64px',
  color: theme.palette.accents6,
  backgroundColor: theme.palette.accents4,
});

export function DemoLayoutBasic() {
  const theme = useTheme();

  return (
    <Grid gutter={[16, 16]}>
      <Grid.Col span={12}>
        <Layout>
          <Layout.Header style={headerStyle(theme)}>Header</Layout.Header>
          <Layout.Content style={contentStyle(theme)}>Content</Layout.Content>
          <Layout.Footer style={footerStyle(theme)}>Footer</Layout.Footer>
        </Layout>
      </Grid.Col>
      <Grid.Col span={12}>
        <Layout>
          <Layout.Header style={headerStyle(theme)}>Header</Layout.Header>
          <Layout>
            <Layout.Sidebar style={sidebarStyle(theme)}>Sidebar</Layout.Sidebar>
            <Layout.Content style={contentStyle(theme)}>Content</Layout.Content>
          </Layout>
          <Layout.Footer style={footerStyle(theme)}>Footer</Layout.Footer>
        </Layout>
      </Grid.Col>
      <Grid.Col span={12}>
        <Layout>
          <Layout.Header style={headerStyle(theme)}>Header</Layout.Header>
          <Layout>
            <Layout.Content style={contentStyle(theme)}>Content</Layout.Content>
            <Layout.Sidebar style={sidebarStyle(theme)}>Sidebar</Layout.Sidebar>
          </Layout>
          <Layout.Footer style={footerStyle(theme)}>Footer</Layout.Footer>
        </Layout>
      </Grid.Col>
      <Grid.Col span={12}>
        <Layout>
          <Layout.Sidebar style={sidebarStyle(theme)}>Sidebar</Layout.Sidebar>
          <Layout>
            <Layout.Header style={headerStyle(theme)}>Header</Layout.Header>
            <Layout.Content style={contentStyle(theme)}>Content</Layout.Content>
            <Layout.Footer style={footerStyle(theme)}>Footer</Layout.Footer>
          </Layout>
        </Layout>
      </Grid.Col>
    </Grid>
  );
}
