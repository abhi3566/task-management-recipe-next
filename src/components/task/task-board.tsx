"use client";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskStore } from "@/store/task-store";
import { TaskColumn } from "./task-column";
import { TaskFilter } from "./task-filter";
import { toast } from "sonner";
import { TaskStatus } from "@/types/task";

export function TaskBoard() {
  const { getFilteredAndSortedTasks, changeTaskStatus } = useTaskStore();
  const allTasks = getFilteredAndSortedTasks();
  
  const todoTasks = allTasks.filter(task => task.status === "To Do");
  const inProgressTasks = allTasks.filter(task => task.status === "In Progress");
  const doneTasks = allTasks.filter(task => task.status === "Done");

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // Dropped outside a valid drop zone
    if (!destination) return;
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    
    // Get the new status based on the destination droppable ID
    let newStatus: TaskStatus;
    
    switch(destination.droppableId) {
      case "todo":
        newStatus = "To Do";
        break;
      case "inProgress":
        newStatus = "In Progress";
        break;
      case "done":
        newStatus = "Done";
        break;
      default:
        return; // Invalid destination
    }
    
    // Update task status
    changeTaskStatus(draggableId, newStatus);
    toast.success(`Task moved to ${newStatus}`);
  };
  
  return (
    <div className="h-full flex flex-col">
      <TaskFilter />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow overflow-hidden mt-4">
          <div className="h-full overflow-hidden flex flex-col">
            <TaskColumn droppableId="todo" title="To Do" status="To Do" tasks={todoTasks} />
          </div>
          <div className="h-full overflow-hidden flex flex-col">
            <TaskColumn droppableId="inProgress" title="In Progress" status="In Progress" tasks={inProgressTasks} />
          </div>
          <div className="h-full overflow-hidden flex flex-col">
            <TaskColumn droppableId="done" title="Done" status="Done" tasks={doneTasks} />
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
