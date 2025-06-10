"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2 } from "lucide-react";
import { ReactNode, useState } from "react";

interface DeleteTaskDialogProps {
  onConfirm: () => void;
  trigger?: ReactNode;
}

export function DeleteTaskDialog({ onConfirm, trigger }: DeleteTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="animate-in zoom-in-95 duration-200">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <AlertCircle className="h-5 w-5" />
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task from your board.
          </AlertDialogDescription>
          <div className="mt-4 p-3 border rounded-md bg-destructive/5 border-destructive/20">
            <p className="font-medium text-sm text-foreground">Are you sure you want to continue?</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="transition-all">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
