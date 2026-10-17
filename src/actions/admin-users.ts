"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

type ActionResult = { ok: true; message: string } | { ok: false; message: string };

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "The request could not be completed.";
}

function refreshUsers() {
  revalidatePath("/dashboard/admin/users");
}

export async function banUserAction(userId: string): Promise<ActionResult> {
  try {
    await auth.api.banUser({ body: { userId }, headers: await headers() });
    refreshUsers();
    return { ok: true, message: "User has been banned and signed out." };
  } catch (error) {
    return { ok: false, message: messageFor(error) };
  }
}

export async function unbanUserAction(userId: string): Promise<ActionResult> {
  try {
    await auth.api.unbanUser({ body: { userId }, headers: await headers() });
    refreshUsers();
    return { ok: true, message: "User has been unbanned." };
  } catch (error) {
    return { ok: false, message: messageFor(error) };
  }
}

export async function deleteUserAction(userId: string): Promise<ActionResult> {
  try {
    await auth.api.removeUser({ body: { userId }, headers: await headers() });
    refreshUsers();
    return { ok: true, message: "User was permanently deleted." };
  } catch (error) {
    return { ok: false, message: messageFor(error) };
  }
}

export async function setUserPasswordAction(userId: string, newPassword: string): Promise<ActionResult> {
  if (newPassword.length < 8) {
    return { ok: false, message: "Password must be at least 8 characters." };
  }

  try {
    await auth.api.setUserPassword({ body: { userId, newPassword }, headers: await headers() });
    return { ok: true, message: "Password has been updated." };
  } catch (error) {
    return { ok: false, message: messageFor(error) };
  }
}
