import { TaskBoard } from "@/components/task/task-board";
import { TaskLayout } from "@/components/task/task-layout";
import Link from "next/link";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen p-4 md:p-6">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Task Management</h1>
            <p className="text-muted-foreground">Manage your tasks efficiently</p>
          </div>
          <Link href="/recipes">
            <Button variant="outline" className="gap-2 hover:bg-amber-50 border-amber-200 hover:border-amber-300 transition-all">
              <ChefHat className="h-4 w-4 text-amber-500" />
              <span>Recipe Finder</span>
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="h-[calc(100vh-180px)]">
        <TaskLayout>
          <TaskBoard />
        </TaskLayout>
      </main>
    </div>
  );
}
