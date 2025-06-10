import { useState } from "react";
import { Edit, MoreHorizontal, Trash, ClipboardCheck, Clock3, CircleEllipsis, ArrowUpCircle } from "lucide-react";

import { Task, TaskStatus } from "@/types/task";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TaskForm } from "./task-form";
import { DeleteTaskDialog } from "./delete-task-dialog";

interface TaskActionsProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: TaskStatus) => void;
}

export function TaskActions({ task, onEdit, onDelete, onChangeStatus }: TaskActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleEdit = async (formData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    setIsSubmitting(true);
    try {
      await onEdit({ ...task, ...formData });
      setIsDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirmed = () => {
    onDelete(task.id);
  };
  
  // Status specific icons
  const statusIcons = {
    "To Do": <ClipboardCheck className="mr-2 h-4 w-4" />,
    "In Progress": <Clock3 className="mr-2 h-4 w-4" />,
    "Done": <ArrowUpCircle className="mr-2 h-4 w-4" />
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-muted/80 transition-colors">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="animate-in slide-in-from-top-5 duration-200">
          <DropdownMenuLabel>Task Actions</DropdownMenuLabel>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CircleEllipsis className="mr-2 h-4 w-4" />
              Change Status
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem 
                onClick={() => onChangeStatus(task.id, "To Do")}
                disabled={task.status === "To Do"}
              >
                {statusIcons["To Do"]}
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onChangeStatus(task.id, "In Progress")}
                disabled={task.status === "In Progress"}
              >
                {statusIcons["In Progress"]}
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onChangeStatus(task.id, "Done")}
                disabled={task.status === "Done"}
              >
                {statusIcons["Done"]}
                Done
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          
          <DropdownMenuSeparator />
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem 
                onSelect={(e) => e.preventDefault()}
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Task
              </DropdownMenuItem>
            </DialogTrigger>            <DialogContent className="max-w-md" aria-describedby="edit-task-description">
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <p id="edit-task-description" className="text-sm text-muted-foreground sr-only">
                  Edit the task details below
                </p>
              </DialogHeader>
              <TaskForm task={task} onSubmit={handleEdit} isSubmitting={isSubmitting} />
            </DialogContent>
          </Dialog>

          <DeleteTaskDialog
            onConfirm={handleDeleteConfirmed}
            trigger={
              <DropdownMenuItem 
                onSelect={(e) => e.preventDefault()}
                className="text-destructive focus:text-destructive"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Task
              </DropdownMenuItem>
            }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
