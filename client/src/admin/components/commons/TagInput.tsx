import { X } from "lucide-react";
import { Input } from "@/components/ui/input.js";
import { useState } from "react";

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export const TagInput = ({ value, onChange }: TagInputProps) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    if (!input.trim() || value.includes(input)) return;
    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="border rounded-md p-2 space-y-2">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm"
          >
            {tag}
            <X
              size={14}
              className="cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </span>
        ))}
      </div>

      <Input
        placeholder="Press Enter to add tag"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
      />
    </div>
  );
};
