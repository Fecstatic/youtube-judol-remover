import { Search as SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';

export default function Search() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('Navbar');
  return (
    <>
      <div
        className="relative ml-auto flex-1 pr-3 md:grow-0 lg:pr-0"
        onClick={() => setOpen(true)}
        aria-hidden="true"
      >
        <SearchIcon className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={`${t('search')}...`}
          className="w-full cursor-pointer rounded-md bg-background pl-8 md:w-[200px] lg:w-[336px]"
          readOnly
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
