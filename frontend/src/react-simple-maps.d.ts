declare module 'react-simple-maps' {
  import * as React from 'react';

  export interface ComposableMapProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    projection?: string | ((...args: any[]) => any);
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
      parallels?: [number, number];
      precision?: number;
    };
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;

  export interface GeographiesProps {
    geography: string | Record<string, any> | string[];
    children: (props: { geographies: any[]; outline: any; borders: any }) => React.ReactNode;
    parseGeographies?: (geos: any[]) => any[];
    className?: string;
    style?: React.CSSProperties;
  }

  export const Geographies: React.FC<GeographiesProps>;

  export interface GeographyProps extends React.SVGProps<SVGPathElement> {
    geography: any;
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
    onClick?: (event: React.MouseEvent<SVGPathElement, MouseEvent>) => void;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    className?: string;
  }

  export const Geography: React.FC<GeographyProps>;

  export interface MarkerProps extends React.SVGProps<SVGGElement> {
    coordinates: [number, number];
    onMouseEnter?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
    onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  export const Marker: React.FC<MarkerProps>;

  export const Graticule: React.FC<React.SVGProps<SVGPathElement> & { stroke?: string; strokeWidth?: number }>;
  export const Sphere: React.FC<React.SVGProps<SVGPathElement> & { stroke?: string; strokeWidth?: number; fill?: string }>;
  export const Line: React.FC<any>;
}
