"use client";

interface TaskLayoutProps {
  children: React.ReactNode;
}

export function TaskLayout({ children }: TaskLayoutProps) {
  return (
    <div className="h-full flex flex-col">
      {children}
    </div>
  );
}
