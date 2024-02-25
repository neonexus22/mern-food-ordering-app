import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { CircleUserRound, Menu } from "lucide-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();
  if (isLoading) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center font-bold gap-2 text-orange-500">
                <CircleUserRound className="text-orange-500" />
                {user?.email}
              </span>
            ) : (
              <span> Welcome to MernEats.com</span>
            )}
          </SheetTitle>
          <SheetDescription>
            {isAuthenticated ? (
              <MobileNavLinks />
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                className="w-full font-bold bg-orange-500"
              >
                Log In
              </Button>
            )}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
