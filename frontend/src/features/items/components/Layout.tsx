import { FC, ReactNode, useState } from "react";
import { PrimarySearchAppBar } from "../../../components/Miscellaneous/Appbar";
import { PersistentDrawer } from "../../../components/Miscellaneous/PersistentDrawer";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const swapDrawerState = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [open, setOpen] = useState(true);

  return (
    <>
      <PrimarySearchAppBar onMenuClick={swapDrawerState} open={open} />
      <PersistentDrawer open={open} onDrawerClose={handleDrawerClose}>
        {children}
      </PersistentDrawer>
    </>
  );
};
