import { FloatingPortal, arrow } from '@floating-ui/react';
import { offset, shift, useFloating } from '@floating-ui/react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  renderPopover: React.ReactNode;
  initialOpen?: boolean;
}

export default function Popover({ children, className, renderPopover, initialOpen }: Props) {
  const [isOpen, setIsOpen] = useState(initialOpen || false);
  const arrowRef = useRef<HTMLElement>(null);

  const { x, y, refs, strategy, middlewareData } = useFloating({
    open: isOpen,
    placement: 'bottom-end',
    middleware: [offset(7), shift(), arrow({ element: arrowRef })]
  });

  const showPopover = () => {
    setIsOpen(true);
  };
  const hidePopover = () => {
    setIsOpen(false);
  };

  return (
    <div className={className} onMouseEnter={showPopover} onMouseLeave={hidePopover} ref={refs.setReference}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              ref={refs.setFloating}
              className='Tooltip relative cursor-pointer rounded-sm border bg-white shadow-sm'
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={arrowRef}
                style={{
                  top: middlewareData.arrow?.y,
                  left: middlewareData.arrow?.x,
                  zIndex: 1
                }}
                className='absolute -translate-y-full border-[10px] border-x-transparent border-b-white border-t-transparent'
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  );
}
