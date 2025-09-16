import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect app routes under /app except public marketing pages
    "/((?!_next|api|public|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
