import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface ToggleDayProps {
  value: string;
  day: string;
  title: string;
  weekDays: Array<string>;
}

export function ToggleDay({ value, day, title, weekDays }: ToggleDayProps) {
  return (
    <ToggleGroup.Item
      value={value}
      title={title}
      className={`w-8 h-8 rounded ${
        weekDays.includes(value) ? "bg-violet-500" : "bg-zinc-900"
      }`}
    >
      {day}
    </ToggleGroup.Item>
  );
}
