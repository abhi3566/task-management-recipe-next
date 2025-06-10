import { useState } from "react";
import { Search, X, Filter, ArrowDownAZ, Calendar, ArrowUp, ArrowDown } from "lucide-react";

import { TaskPriority, TaskStatus, SortOption, SortDirection } from "@/types/task";
import { useTaskStore } from "@/store/task-store";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function TaskFilter() {
  const { filter, setFilter, sort, setSort } = useTaskStore();
  const [search, setSearch] = useState(filter.search || "");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilter({ ...filter, search });
  };
  
  const handleClearSearch = () => {
    setSearch("");
    setFilter({ ...filter, search: undefined });
  };
  
  const handleFilterChange = (
    type: "status" | "priority",
    value: TaskStatus | TaskPriority | string | undefined
  ) => {
    setFilter({
      ...filter,
      [type]: value === "all" ? undefined : value as TaskStatus | TaskPriority,
    });
  };
    const handleSortChange = (
    option: SortOption,
    direction: SortDirection
  ) => {
    setSort({ option, direction });
  };

  // Count active filters
  const activeFilterCount = [
    filter.status !== undefined, 
    filter.priority !== undefined, 
    filter.search !== undefined && filter.search !== ""
  ].filter(Boolean).length;
  
  const priorityColor = {
    "Low": "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
    "Medium": "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200",
    "High": "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
  };
  
  const statusColor = {
    "To Do": "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200",
    "In Progress": "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
    "Done": "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
  };
  
  const getSortIcon = (sortOption: string) => {
    if (sort.option === sortOption) {
      return sort.direction === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-16 h-10 focus-visible:ring-primary/20 border-muted"
            />
            {search && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClearSearch}
                className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-6"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
            <Button 
              type="submit" 
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
            >
              Search
            </Button>
          </div>
        </form>
        
        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2 whitespace-nowrap min-w-[120px]">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] font-bold bg-primary">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-5 duration-200">
            <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <div className="p-2">
              <Label className="text-xs text-muted-foreground mb-1 block">Status</Label>              <div className="grid grid-cols-2 gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.status === undefined ? 'bg-muted border-primary' : 'bg-transparent'} text-xs h-8 justify-start`}
                  onClick={() => handleFilterChange("status", "all")}
                >
                  All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.status === 'To Do' ? statusColor['To Do'] : 'bg-transparent'} text-xs h-8 justify-start`}
                  onClick={() => handleFilterChange("status", "To Do")}
                >
                  To Do
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.status === 'In Progress' ? statusColor['In Progress'] : 'bg-transparent'} text-xs h-8 justify-start`}
                  onClick={() => handleFilterChange("status", "In Progress")}
                >
                  In Progress
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.status === 'Done' ? statusColor['Done'] : 'bg-transparent'} text-xs h-8 justify-start`}
                  onClick={() => handleFilterChange("status", "Done")}
                >
                  Done
                </Button>
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <div className="p-2">
              <Label className="text-xs text-muted-foreground mb-1 block">Priority</Label>
              <div className="grid grid-cols-3 gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.priority === undefined ? 'bg-muted border-primary' : 'bg-transparent'} text-xs h-8 justify-start`}
                  onClick={() => handleFilterChange("priority", "all")}
                >
                  All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.priority === 'Low' ? priorityColor['Low'] : 'bg-transparent'} text-xs h-8 justify-start`}
                  onClick={() => handleFilterChange("priority", "Low")}
                >
                  Low
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.priority === 'Medium' ? priorityColor['Medium'] : 'bg-transparent'} text-xs h-8 justify-start`}
                  onClick={() => handleFilterChange("priority", "Medium")}
                >
                  Medium
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`${filter.priority === 'High' ? priorityColor['High'] : 'bg-transparent'} text-xs h-8 justify-start col-span-3`}
                  onClick={() => handleFilterChange("priority", "High")}
                >
                  High
                </Button>
              </div>
            </div>

            {(filter.status !== undefined || filter.priority !== undefined) && (
              <>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => setFilter({})}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 whitespace-nowrap">
              <ArrowDownAZ className="h-4 w-4" />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 animate-in slide-in-from-top-5 duration-200">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={sort.option === "createdAt" ? "bg-muted" : ""}>
                <div className="flex items-center justify-between w-full">
                  <span>Created Date</span>
                  {getSortIcon("createdAt")}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSortChange("createdAt", "desc")} className={sort.option === "createdAt" && sort.direction === "desc" ? "bg-muted" : ""}>
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-3 w-3" />
                    <span>Newest first</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("createdAt", "asc")} className={sort.option === "createdAt" && sort.direction === "asc" ? "bg-muted" : ""}>
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-3 w-3" />
                    <span>Oldest first</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={sort.option === "dueDate" ? "bg-muted" : ""}>
                <div className="flex items-center justify-between w-full">
                  <span>Due Date</span>
                  {getSortIcon("dueDate")}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSortChange("dueDate", "asc")} className={sort.option === "dueDate" && sort.direction === "asc" ? "bg-muted" : ""}>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Earliest first</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("dueDate", "desc")} className={sort.option === "dueDate" && sort.direction === "desc" ? "bg-muted" : ""}>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>Latest first</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className={sort.option === "priority" ? "bg-muted" : ""}>
                <div className="flex items-center justify-between w-full">
                  <span>Priority</span>
                  {getSortIcon("priority")}
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleSortChange("priority", "desc")} className={sort.option === "priority" && sort.direction === "desc" ? "bg-muted" : ""}>
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-3 w-3" />
                    <span>High to Low</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("priority", "asc")} className={sort.option === "priority" && sort.direction === "asc" ? "bg-muted" : ""}>
                  <div className="flex items-center gap-2">
                    <ArrowUp className="h-3 w-3" />
                    <span>Low to High</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filter Tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {filter.status && (
            <Badge variant="outline" className={`${statusColor[filter.status]} flex items-center gap-1.5`}>
              Status: {filter.status}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("status", "all")} />
            </Badge>
          )}
          {filter.priority && (
            <Badge variant="outline" className={`${priorityColor[filter.priority]} flex items-center gap-1.5`}>
              Priority: {filter.priority}
              <X className="h-3 w-3 cursor-pointer" onClick={() => handleFilterChange("priority", "all")} />
            </Badge>
          )}
          {filter.search && (
            <Badge variant="outline" className="bg-muted flex items-center gap-1.5">
              Search: {filter.search}
              <X className="h-3 w-3 cursor-pointer" onClick={handleClearSearch} />
            </Badge>
          )}
          {activeFilterCount > 1 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 text-xs px-2 hover:bg-muted/80"
              onClick={() => setFilter({})}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
