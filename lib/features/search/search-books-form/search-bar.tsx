"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { GutenbergBookMetadata } from "@prisma/client";

import { useState } from "react";

interface SearchInputProps {
  results: GutenbergBookMetadata[];
  onValueChange?: (value: string) => void;
}

export function SearchBar({ results, onValueChange }: SearchInputProps) {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [flag, setFlag] = useState<boolean>(false);

  const handleValueChange = (value: string) => {
    setValue(value);
    if (flag) {
      setTimeout(() => {
        setFlag(false);
      }, 2000);
    } else {
      onValueChange?.(value);
      setFlag(true);
    }
  };

  return (
    <Command inputMode="text">
      <CommandInput
        autoFocus
        className="h-full"
        onValueChange={handleValueChange}
        value={value}
        placeholder="Search..."
      />
      {value && (
        <CommandList className="border-none">
          <CommandEmpty>No books found</CommandEmpty>
          {results?.map((book) => (
            <CommandItem key={book.id}>
              <span>{JSON.stringify(book.title)}</span>
              <span>{JSON.stringify(book.authors)}</span>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
}
