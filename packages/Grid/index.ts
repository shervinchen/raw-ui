import Grid from './Grid';
import GridCol from './GridCol';

export type GridComponentType = typeof Grid & {
  Col: typeof GridCol;
};

(Grid as GridComponentType).Col = GridCol;

export default Grid as GridComponentType;
