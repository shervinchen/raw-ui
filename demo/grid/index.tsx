import { Grid, useTheme } from '@/packages';

export const rowStyle = {
  marginTop: '16px',
  marginBottom: '16px',
};

export const box100 = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100px',
};

export const box60 = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '60px',
};

export const box120 = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '120px',
};

export const box80 = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80px',
};

export const LightBox = ({ children, ...restProps }) => {
  const theme = useTheme();

  return (
    <div className="box" {...restProps}>
      {children}
      <style jsx>{`
        .box {
          padding: 16px 0;
          color: ${theme.palette.accents6};
          text-align: center;
          background-color: ${theme.palette.accents4};
        }
      `}</style>
    </div>
  );
};

export const DarkBox = ({ children, ...restProps }) => {
  const theme = useTheme();

  return (
    <div className="box" {...restProps}>
      {children}
      <style jsx>{`
        .box {
          padding: 16px 0;
          color: ${theme.palette.accents4};
          text-align: center;
          background-color: ${theme.palette.accents6};
        }
      `}</style>
    </div>
  );
};

export function DemoGridBasic() {
  return (
    <>
      <Grid style={rowStyle}>
        <Grid.Col span={24}>
          <LightBox>col</LightBox>
        </Grid.Col>
      </Grid>
      <Grid style={rowStyle}>
        <Grid.Col span={12}>
          <LightBox>col-12</LightBox>
        </Grid.Col>
        <Grid.Col span={12}>
          <DarkBox>col-12</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid style={rowStyle}>
        <Grid.Col span={8}>
          <LightBox>col-8</LightBox>
        </Grid.Col>
        <Grid.Col span={8}>
          <DarkBox>col-8</DarkBox>
        </Grid.Col>
        <Grid.Col span={8}>
          <LightBox>col-8</LightBox>
        </Grid.Col>
      </Grid>
      <Grid style={rowStyle}>
        <Grid.Col span={6}>
          <LightBox>col-6</LightBox>
        </Grid.Col>
        <Grid.Col span={6}>
          <DarkBox>col-6</DarkBox>
        </Grid.Col>
        <Grid.Col span={6}>
          <LightBox>col-6</LightBox>
        </Grid.Col>
        <Grid.Col span={6}>
          <DarkBox>col-6</DarkBox>
        </Grid.Col>
      </Grid>
    </>
  );
}

export function DemoGridGutter() {
  return (
    <Grid gutter={[16, 24]} style={rowStyle}>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
      <Grid.Col span={6}>
        <LightBox>col-6</LightBox>
      </Grid.Col>
    </Grid>
  );
}

export function DemoGridOffset() {
  return (
    <>
      <Grid style={rowStyle}>
        <Grid.Col span={8}>
          <LightBox>col-8</LightBox>
        </Grid.Col>
        <Grid.Col span={8} offset={8}>
          <DarkBox>col-8 col-offset-8</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid style={rowStyle}>
        <Grid.Col span={6} offset={6}>
          <LightBox>col-6 col-offset-6</LightBox>
        </Grid.Col>
        <Grid.Col span={6} offset={6}>
          <DarkBox>col-6 col-offset-6</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid style={rowStyle}>
        <Grid.Col span={12} offset={6}>
          <LightBox>col-12 col-offset-6</LightBox>
        </Grid.Col>
      </Grid>
    </>
  );
}

export function DemoGridOrder() {
  return (
    <Grid>
      <Grid.Col span={6} order={4}>
        <LightBox>1 col-order-4</LightBox>
      </Grid.Col>
      <Grid.Col span={6} order={3}>
        <DarkBox>2 col-order-3</DarkBox>
      </Grid.Col>
      <Grid.Col span={6} order={2}>
        <LightBox>3 col-order-2</LightBox>
      </Grid.Col>
      <Grid.Col span={6} order={1}>
        <DarkBox>4 col-order-1</DarkBox>
      </Grid.Col>
    </Grid>
  );
}

export function DemoGridAlign() {
  return (
    <>
      <Grid align="top" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid align="center" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid align="bottom" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
    </>
  );
}

export function DemoGridJustify() {
  return (
    <>
      <Grid justify="start" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid justify="center" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid justify="end" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid justify="space-between" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid justify="space-around" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
      <Grid justify="space-evenly" style={rowStyle}>
        <Grid.Col span={4}>
          <LightBox style={box100}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box60}>col-4</DarkBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <LightBox style={box120}>col-4</LightBox>
        </Grid.Col>
        <Grid.Col span={4}>
          <DarkBox style={box80}>col-4</DarkBox>
        </Grid.Col>
      </Grid>
    </>
  );
}

export function DemoGridResponsive() {
  return (
    <Grid gutter={[{ xs: 8, sm: 16, md: 24, lg: 32, xl: 40, xxl: 48 }, 16]}>
      <Grid.Col span={{ xs: 4, sm: 8, md: 4, lg: 6, xl: 6, xxl: 6 }}>
        <LightBox>Col</LightBox>
      </Grid.Col>
      <Grid.Col span={{ xs: 6, sm: 6, md: 8, lg: 8, xl: 6, xxl: 6 }}>
        <DarkBox>Col</DarkBox>
      </Grid.Col>
      <Grid.Col span={{ xs: 6, sm: 4, md: 6, lg: 6, xl: 6, xxl: 6 }}>
        <LightBox>Col</LightBox>
      </Grid.Col>
      <Grid.Col span={{ xs: 8, sm: 6, md: 6, lg: 4, xl: 6, xxl: 6 }}>
        <DarkBox>Col</DarkBox>
      </Grid.Col>
      <Grid.Col span={{ xs: 4, sm: 8, md: 4, lg: 6, xl: 6, xxl: 6 }}>
        <LightBox>Col</LightBox>
      </Grid.Col>
      <Grid.Col span={{ xs: 6, sm: 6, md: 8, lg: 8, xl: 6, xxl: 6 }}>
        <DarkBox>Col</DarkBox>
      </Grid.Col>
      <Grid.Col span={{ xs: 6, sm: 4, md: 6, lg: 6, xl: 6, xxl: 6 }}>
        <LightBox>Col</LightBox>
      </Grid.Col>
      <Grid.Col span={{ xs: 8, sm: 6, md: 6, lg: 4, xl: 6, xxl: 6 }}>
        <DarkBox>Col</DarkBox>
      </Grid.Col>
    </Grid>
  );
}
