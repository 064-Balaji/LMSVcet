import { CircleUser, LogIn, Menu, Package2, Search, Book } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { auth } from "@/auth";
import { studentsNavLinks } from "@/lib/consts";
import { staffNavLinks } from "@/lib/consts";
import { ModeToggle } from "./Toggle";

const NavBar = async () => {
  const session = await auth();
  const user = session?.user;
  const isStudentUser = session?.user.type === "student";
  // const isStaffUser = session?.user.type === 'staff';
  const navLinks = isStudentUser ? studentsNavLinks : staffNavLinks;

  return (
    <header className="sticky top-0 z-10 justify-between flex h-16 items-center gap-4 shadow-md bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Book className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {user &&
          navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-foreground transition-colors hover:text-foreground"
            >
              {link.title}
            </Link>
          ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Book className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {user &&
              navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-foreground transition-colors hover:text-foreground"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div> */}
        </form>
        {session ? (
          <>
            {session.user.name}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href={"/api/auth/signout"}>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1 items-center">
                <span>Signin</span>
                <LogIn className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/staff/signin"}>
                <DropdownMenuItem>Staff</DropdownMenuItem>
              </Link>
              <Link href={"/student/signin"}>
                <DropdownMenuItem>Student</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default NavBar;
