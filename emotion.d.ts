import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    dark: boolean;
    colors: {
      primary: string;
      card: string;
      background: string;
      notification: string;
      text: string;
      border: string;
      accent1?: string;
      accent2?: string;
      green?: string;
      red?: string;
    };
  }
}
