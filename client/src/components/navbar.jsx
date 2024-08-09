import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0 );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const location = useLocation();
  const handleSheetOpen = () => {
    setScrollPosition(window.scrollY);
    setIsSheetOpen(true);
  };

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const date = new Date();
  const year = date.getFullYear();

  return (
    <nav
      className={`top-0 w-full h-16 text-white backdrop-blur flex justify-between items-center px-3 py-4 fixed z-50 transition-colors duration-300 ${
        isTransparent ? "bg-transparent text-white" : "bg-black text-white"
      }`}
    >
      <div>
        <h2 className="md:text-2xl text-white text-xl  font-bold">
          Visvotsav
          <span className="text-foreground max-sm:hidden text-white">
            {" "}
            {year}
          </span>
        </h2>
      </div>
      <div className="flex gap-2">
        <div>
          <Link
            to={location.pathname === "/" ? "/register" : "/"}
            className="bg-primary hidden sm:flex text-white rounded-full px-4 py-2"
          >
            {location.pathname === "/" ? "Register" : "Home"}
          </Link>
        </div>
        <div>
          <Sheet
            open={isSheetOpen}
            onOpenChange={(open) => {
              if (open) {
                handleSheetOpen();
              } else {
                handleSheetClose();
              }
            }}
          >
            <SheetTrigger asChild>
              <Button variant={"ghost"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col items-center mt-4 mb-1 p-2">
                <SheetClose asChild>
                  <li className="py-2">
                    <ScrollLink
                      to="home"
                      className="text-muted-foreground cursor-pointer hover:text-primary"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Home
                    </ScrollLink>
                  </li>
                </SheetClose>
                <Separator className="my-1" />
                <SheetClose asChild>
                  <li className="py-2">
                    <ScrollLink
                      to="about"
                      className="text-muted-foreground cursor-pointer hover:text-primary"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      About
                    </ScrollLink>
                  </li>
                </SheetClose>
                <Separator className="my-1" />
                <SheetClose asChild>
                  <li className="py-2">
                    <ScrollLink
                      to="schedule"
                      className="text-muted-foreground cursor-pointer hover:text-primary"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      schedule
                    </ScrollLink>
                  </li>
                </SheetClose>
                <Separator className="my-1" />

                <SheetClose asChild>
                  <li className="py-2">
                    <ScrollLink
                      to="pricing"
                      className="text-muted-foreground cursor-pointer hover:text-primary"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Pricing
                    </ScrollLink>
                  </li>
                </SheetClose>
                <Separator className="my-1" />
                <SheetClose asChild>
                  <li className="py-2">
                    <ScrollLink
                      to="contact"
                      className="text-muted-foreground cursor-pointer hover:text-primary"
                      smooth={true}
                      duration={500}
                      onClick={() => setIsSheetOpen(false)}
                    >
                      Contact
                    </ScrollLink>
                  </li>
                </SheetClose>
                <Separator className="my-1" />
                <SheetClose asChild>
                  <Link
                    to={location.pathname === "/" ? "/register" : "/"}
                    className="bg-primary  w-full text-white rounded-lg px-4 py-3 text-center "
                  >
                    {location.pathname === "/" ? "Register" : "Home"}
                  </Link>
                </SheetClose>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
