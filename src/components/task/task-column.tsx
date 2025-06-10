"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

import { Task, TaskStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { TaskForm } from "./task-form";
import { TaskCard } from "./task-card";
import { useTaskStore } from "@/store/task-store";

interface TaskColumnProps {
  droppableId: string;
  title: string;
  status: TaskStatus;
  tasks: Task[];
}

export function TaskColumn({ droppableId, title, status, tasks }: TaskColumnProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { addTask, updateTask, deleteTask, changeTaskStatus } = useTaskStore();
  
  const handleAddTask = async (formData: any) => {
    setIsSubmitting(true);
    try {
      addTask({
        ...formData,
        status,
      });
      setIsDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEditTask = (task: Task) => {
    updateTask(task.id, task);
  };
  
  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };
  
  const handleChangeStatus = (id: string, newStatus: TaskStatus) => {
    changeTaskStatus(id, newStatus);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {title} <span className="text-muted-foreground">({tasks.length})</span>
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Task to {title}</DialogTitle>
            </DialogHeader>
            <TaskForm onSubmit={handleAddTask} isSubmitting={isSubmitting} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            className={`space-y-3 flex-grow overflow-auto p-2 rounded-md ${
              snapshot.isDraggingOver ? "bg-muted/50" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? "opacity-70" : ""}`}
                    >
                      <TaskCard 
                        task={task} 
                        onEdit={handleEditTask} 
                        onDelete={handleDeleteTask}
                        onChangeStatus={handleChangeStatus}
                      />
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <Card className="p-4 flex items-center justify-center h-20 text-muted-foreground border-dashed">
                No tasks
              </Card>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
