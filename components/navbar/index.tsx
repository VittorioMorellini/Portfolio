import DesktopNavBar from "./desktop";
import { MobileNavBar } from "./mobile";

interface NavBarProps {
    show: boolean,
    onChangeVisibility: any
}

export function NavBar({ show, onChangeVisibility }: NavBarProps) {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopNavBar />
      </div>
      <div className="block lg:hidden">
        <MobileNavBar show={show} onChangeVisibility={onChangeVisibility} />
      </div>
    </>
  );
}