import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title?: string;
  children: React.ReactNode;
}

const LayerPopup = ({ open, setOpen, title, children }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mx-auto mb-3">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default LayerPopup;
