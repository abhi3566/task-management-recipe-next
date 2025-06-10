import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Done"], {
    required_error: "Status is required",
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    required_error: "Priority is required",
  }),
  dueDate: z.date().optional(),
  assignee: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
