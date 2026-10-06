import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handlers = toNextJsHandler(auth);

export const POST = handlers.POST;

// Better Auth sends OAuth failures to this endpoint. Redirect it to an app page
// so users get a helpful Farmora message instead of a bare API response.
export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  if (url.pathname === "/api/auth/error") {
    const error = url.searchParams.get("error");
    const destination = new URL("/auth-error", url.origin);
    if (error) destination.searchParams.set("error", error);
    return NextResponse.redirect(destination);
  }

  return handlers.GET(request);
}
