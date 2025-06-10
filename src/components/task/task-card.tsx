import { format } from "date-fns";
import { Calendar, Clock, User, Bookmark, AlertCircle, CheckCircle2 } from "lucide-react";

import { Task } from "@/types/task";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TaskActions } from "./task-actions";

const priorityConfig = {
  "Low": {
    color: "bg-blue-100 hover:bg-blue-200 text-blue-700 border-blue-200",
    icon: <Bookmark className="h-3 w-3 mr-1" />,
    borderColor: "#3b82f6"
  },
  "Medium": {
    color: "bg-amber-100 hover:bg-amber-200 text-amber-700 border-amber-200",
    icon: <Bookmark className="h-3 w-3 mr-1 fill-amber-500" />,
    borderColor: "#f59e0b"
  },
  "High": {
    color: "bg-red-100 hover:bg-red-200 text-red-700 border-red-200",
    icon: <AlertCircle className="h-3 w-3 mr-1" />,
    borderColor: "#ef4444"
  }
};

const statusConfig = {
  "To Do": {
    color: "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200",
    icon: <Bookmark className="h-3 w-3 mr-1" />,
    borderColor: "#64748b"
  },
  "In Progress": {
    color: "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-200",
    icon: <Clock className="h-3 w-3 mr-1" />,
    borderColor: "#9333ea"
  },
  "Done": {
    color: "bg-green-100 hover:bg-green-200 text-green-700 border-green-200",
    icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    borderColor: "#16a34a"
  }
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, status: Task["status"]) => void;
}

export function TaskCard({ task, onEdit, onDelete, onChangeStatus }: TaskCardProps) {
  const statusCfg = statusConfig[task.status];
  const priorityCfg = priorityConfig[task.priority];

  return (
    <Card 
      className="h-full flex flex-col hover:shadow-md transition-all duration-200 border-l-4 group"
      style={{
        borderLeftColor: statusCfg.borderColor,
        transform: 'translateY(0)',
      }}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2 pt-3.5 px-4">
        <div className="grid gap-1">
          <h3 className="font-medium leading-none tracking-tight text-base group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          <div className="flex gap-1.5 flex-wrap mt-1">
            <Badge 
              className={`${statusCfg.color} flex items-center gap-0.5 font-normal transition-opacity duration-200`} 
              variant="outline"
            >
              {statusCfg.icon}
              {task.status}
            </Badge>
            <Badge 
              className={`${priorityCfg.color} flex items-center gap-0.5 font-normal transition-opacity duration-200`} 
              variant="outline"
            >
              {priorityCfg.icon}
              {task.priority}
            </Badge>
          </div>
        </div>
        <TaskActions 
          task={task} 
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      </CardHeader>
      <CardContent className="flex-grow px-4 py-1.5">
        <p className="text-sm text-muted-foreground line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {task.description || "No description provided"}
        </p>
      </CardContent>
      <CardFooter className="border-t px-4 py-2 flex flex-wrap gap-x-3 gap-y-1 items-center text-xs bg-muted/10">
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-200">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Due: {format(task.dueDate, "MMM d")}</span>
          </div>
        )}
        {task.assignee && (
          <div className="flex items-center text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-200">
            <User className="h-3 w-3 mr-1" />
            <span>{task.assignee}</span>
          </div>
        )}
        <div className="flex items-center text-xs text-muted-foreground ml-auto group-hover:text-foreground/70 transition-colors duration-200">
          <Clock className="h-3 w-3 mr-1" />
          <span>{format(task.createdAt, "MMM d")}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
