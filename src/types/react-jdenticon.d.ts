declare module 'react-jdenticon' {
  import { ComponentType } from 'react';
  
  interface JdenticonProps {
    value: string;
    size?: string | number;
    [key: string]: unknown;
  }
  
  const Jdenticon: ComponentType<JdenticonProps>;
  export default Jdenticon;
}
