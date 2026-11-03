export const ROUTE_TITLES: Record<string, string> = {
  "/": "Home",
  "/books": "All Books",
  "/add-book": "Add Book",
  "/my-books": "My Books",
  "/my-borrows": "My Borrows",
  "/login": "Login",
  "/register": "Register",
};

export function getPageTitle(pathname: string) {
  const title = ROUTE_TITLES[pathname] || "Page Not Found";

  return `BookNook | ${title}`;
}