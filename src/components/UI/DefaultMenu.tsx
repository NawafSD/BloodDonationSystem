import React, { useState } from "react";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

interface DefaultMenuItem {
  id: string;
  label: string;
}

interface DefaultMenuProps {
  items: DefaultMenuItem[];
  onSelect: (label: string) => void;
}

export function DefaultMenu({ items, onSelect }: DefaultMenuProps) {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (label: string) => {
    setSelectedItem(label);
    onSelect(label);
  };

  return (
    <Menu
      animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}
    >
      <MenuHandler>
        <Button className="text-sm tracking-wide normal-case bg-white border border-[#121212] text-[#212121]">
          {" "}
          {selectedItem || "Blood Type"}
        </Button>
      </MenuHandler>
      <MenuList>
        {items.map((item) => (
          <MenuItem key={item.id} onClick={() => handleItemClick(item.label)}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
