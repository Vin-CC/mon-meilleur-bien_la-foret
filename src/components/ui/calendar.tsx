"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            navLayout="around"
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex flex-row justify-between items-center mb-4 px-2",
                caption_label: "text-sm font-semibold text-gray-900",
                nav: "flex items-center gap-1",
                nav_button: cn(
                    "h-8 w-8 bg-transparent p-0 hover:bg-gray-100 rounded-full inline-flex items-center justify-center"
                ),
                nav_button_previous: "",
                nav_button_next: "",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-gray-500 rounded-md w-10 font-normal text-xs",
                row: "flex w-full mt-2",
                cell: "h-10 w-10 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                day: cn(
                    "h-10 w-10 p-0 font-normal rounded-full hover:bg-blue-50 transition-colors inline-flex items-center justify-center",
                    "aria-selected:opacity-100"
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-100 focus:text-blue-600 font-semibold",
                day_today: "bg-blue-100 text-blue-600 font-semibold",
                day_outside:
                    "day-outside text-gray-300 opacity-50",
                day_disabled: "text-gray-300 opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}

            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
