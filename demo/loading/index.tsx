import React from 'react';
import Unit from '../Unit';
import { Loading } from '@/packages';

export function DemoLoadingTypes() {
  return (
    <Unit layout="row">
      <Loading />
      <Loading type="spin" />
    </Unit>
  );
}

export function DemoLoadingSizes() {
  return (
    <>
      <Unit layout="row">
        <Loading size={4} />
        <Loading size={6} />
        <Loading size={8} />
      </Unit>
      <Unit layout="row">
        <Loading type="spin" size={16} />
        <Loading type="spin" size={20} />
        <Loading type="spin" size={32} />
      </Unit>
    </>
  );
}

export function DemoLoadingText() {
  return (
    <Unit layout="row">
      <Loading>Loading</Loading>
      <Loading type="spin">Loading</Loading>
    </Unit>
  );
}
