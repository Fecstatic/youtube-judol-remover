import { motion } from 'framer-motion';
import { type ForwardedRef, forwardRef } from 'react';

import { Button } from '@/components/ui/button';

/* eslint-disable jsx-a11y/control-has-associated-label */
type IToggleMenuButtonProps = {
  onClick?: () => void;
  aria?: boolean;
};

/**
 * A toggle button to show/hide component in small screen.
 * @component
 * @params props - Component props.
 * @param props.onClick - Function to run when the button is clicked.
 */
const ToggleMenuButtonInternal = (
  props: IToggleMenuButtonProps,
  ref?: ForwardedRef<HTMLButtonElement>,
) => (
  <Button
    className="flex aspect-square h-fit flex-col p-3"
    variant="outline"
    ref={ref}
    aria-expanded={props.aria}
    {...props}
  >
    <motion.div
      style={{
        width: '15px',
        borderTop: '2px solid',
        transformOrigin: 'center',
      }}
      initial={{ translateY: '-3px' }}
      animate={
        props.aria
          ? { rotate: '45deg', translateY: '1px' }
          : { translateY: '-3px', rotate: '0deg' }
      }
      transition={{ bounce: 0, duration: 0.1 }}
    />
    <motion.div
      transition={{ bounce: 0, duration: 0.1 }}
      style={{
        width: '15px',
        borderTop: '2px solid',
        transformOrigin: 'center',
      }}
      initial={{ translateY: '3px' }}
      animate={
        props.aria
          ? { rotate: '-45deg', translateY: '-1px' }
          : { translateY: '3px', rotate: '0deg', scaleX: 1 }
      }
    />
  </Button>
);

const ToggleMenuButton = forwardRef(ToggleMenuButtonInternal);

export { ToggleMenuButton };
