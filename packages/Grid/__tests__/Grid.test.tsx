import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid from '..';

describe('Grid', () => {
  test('should match the snapshot', () => {
    const { asFragment } = render(
      <Grid>
        <Grid.Col>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should support custom class name', () => {
    render(
      <Grid className="custom-grid">
        <Grid.Col className="custom-grid-col">
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveClass('custom-grid');
    expect(screen.getByTestId('gridCol')).toHaveClass('custom-grid-col');
  });

  test('should support set regular value of gutter', () => {
    render(
      <Grid gutter={[16, 24]}>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      rowGap: '24px',
      marginLeft: '-8px',
      marginRight: '-8px',
    });
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      paddingLeft: '8px',
      paddingRight: '8px',
    });
  });

  test('should support set responsive value of gutter', () => {
    render(
      <Grid
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 },
          { xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 },
        ]}
      >
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      rowGap: '8px',
      marginLeft: '-4px',
      marginRight: '-4px',
    });
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      paddingLeft: '4px',
      paddingRight: '4px',
    });
  });

  test('should support set regular align items', () => {
    render(
      <Grid align="top">
        <Grid.Col>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      alignItems: 'flex-start',
    });
  });

  test('should support set responsive align items', () => {
    render(
      <Grid
        align={{
          xs: 'top',
          sm: 'center',
          md: 'bottom',
          lg: 'normal',
          xl: 'normal',
          xxl: 'normal',
        }}
      >
        <Grid.Col>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      alignItems: 'flex-start',
    });
  });

  test('should support set regular justify content', () => {
    render(
      <Grid justify="start">
        <Grid.Col>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      justifyContent: 'flex-start',
    });
  });

  test('should support set responsive justify content', () => {
    render(
      <Grid
        justify={{
          xs: 'start',
          sm: 'center',
          md: 'end',
          lg: 'space-around',
          xl: 'space-between',
          xxl: 'space-evenly',
        }}
      >
        <Grid.Col>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      justifyContent: 'flex-start',
    });
  });

  test('should support set regular span of grid col', () => {
    render(
      <Grid>
        <Grid.Col span={24}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      flex: '0 0 100%',
      maxWidth: '100%',
    });
  });

  test('should support set responsive span of grid col', () => {
    render(
      <Grid>
        <Grid.Col span={{ xs: 2, sm: 8, md: 4, lg: 10, xl: 6, xxl: 6 }}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      flex: `0 0 ${(2 / 24) * 100}%`,
      maxWidth: `${(2 / 24) * 100}%`,
    });
  });

  test('should support set 0 span of grid col', () => {
    const { rerender } = render(
      <Grid>
        <Grid.Col span={0}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      display: 'none',
    });
    rerender(
      <Grid>
        <Grid.Col span={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0, xxl: 0 }}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      display: 'none',
    });
  });

  test('should support set regular offset of grid col', () => {
    render(
      <Grid>
        <Grid.Col span={8} offset={8}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      marginInlineStart: `${(8 / 24) * 100}%`,
    });
  });

  test('should support set responsive offset of grid col', () => {
    render(
      <Grid>
        <Grid.Col offset={{ xs: 2, sm: 8, md: 4, lg: 10, xl: 6, xxl: 6 }}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      marginInlineStart: `${(2 / 24) * 100}%`,
    });
  });

  test('should support set regular order of grid col', () => {
    render(
      <Grid>
        <Grid.Col span={6} order={4}>
          <div>col-order-4</div>
        </Grid.Col>
        <Grid.Col span={6} order={3}>
          <div>col-order-3</div>
        </Grid.Col>
        <Grid.Col span={6} order={2}>
          <div>col-order-2</div>
        </Grid.Col>
        <Grid.Col span={6} order={1}>
          <div>col-order-1</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      order: 4,
    });
    expect(screen.getAllByTestId('gridCol')[1]).toHaveStyle({
      order: 3,
    });
    expect(screen.getAllByTestId('gridCol')[2]).toHaveStyle({
      order: 2,
    });
    expect(screen.getAllByTestId('gridCol')[3]).toHaveStyle({
      order: 1,
    });
  });

  test('should support set responsive order of grid col', () => {
    render(
      <Grid>
        <Grid.Col span={6} order={{ xs: 4, sm: 1, md: 2, lg: 3 }}>
          <div>col-order-4</div>
        </Grid.Col>
        <Grid.Col span={6} order={{ xs: 3, sm: 2, md: 4, lg: 1 }}>
          <div>col-order-3</div>
        </Grid.Col>
        <Grid.Col span={6} order={{ xs: 2, sm: 3, md: 1, lg: 4 }}>
          <div>col-order-2</div>
        </Grid.Col>
        <Grid.Col span={6} order={{ xs: 1, sm: 4, md: 3, lg: 2 }}>
          <div>col-order-1</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      order: 4,
    });
    expect(screen.getAllByTestId('gridCol')[1]).toHaveStyle({
      order: 3,
    });
    expect(screen.getAllByTestId('gridCol')[2]).toHaveStyle({
      order: 2,
    });
    expect(screen.getAllByTestId('gridCol')[3]).toHaveStyle({
      order: 1,
    });
  });

  test('should get default style of grid when value is illegal', () => {
    const { rerender } = render(
      <Grid
        gutter={[-1, -1]}
        align={'unknown' as unknown}
        justify={'unknown' as unknown}
      >
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      rowGap: '0px',
      marginLeft: '-0px',
      marginRight: '-0px',
      alignItems: 'normal',
      justifyContent: 'normal',
    });
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      paddingLeft: '0px',
      paddingRight: '0px',
    });
    rerender(
      <Grid
        gutter={[{ xs: -1 }, { xs: -1 }]}
        align={{ xs: 'unknown' } as unknown}
        justify={{ xs: 'unknown' } as unknown}
      >
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
        <Grid.Col span={6}>
          <div>col-6</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toHaveStyle({
      rowGap: '0px',
      marginLeft: '-0px',
      marginRight: '-0px',
      alignItems: 'normal',
      justifyContent: 'normal',
    });
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      paddingLeft: '0px',
      paddingRight: '0px',
    });
  });

  test('should get default style of grid col when value is illegal', () => {
    const { rerender } = render(
      <Grid>
        <Grid.Col span={-1} offset={-1} order={-1}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      flex: '0 1 auto',
      maxWidth: 'none',
      marginInlineStart: 0,
      order: 0,
    });
    rerender(
      <Grid>
        <Grid.Col span={{ xs: -1 }} offset={{ xs: -1 }} order={{ xs: -1 }}>
          <div>col</div>
        </Grid.Col>
      </Grid>
    );
    expect(screen.getAllByTestId('gridCol')[0]).toHaveStyle({
      flex: '0 1 auto',
      maxWidth: 'none',
      marginInlineStart: 0,
      order: 0,
    });
  });
});
