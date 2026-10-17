import { Pool } from "pg";

type UserFilter = "all" | "role" | "wished_role";

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  username: string | null;
  role: string;
  wished_role: string | null;
  emailVerified: boolean;
  banned: boolean;
  createdAt: Date | string;
};

const globalForPool = globalThis as typeof globalThis & { adminUserPool?: Pool };
const pool = globalForPool.adminUserPool ?? new Pool({ connectionString: process.env.DB_URL });

if (process.env.NODE_ENV !== "production") globalForPool.adminUserPool = pool;

export async function getAdminUsers({ search, filter, filterValue, limit, offset }: {
  search: string;
  filter: UserFilter;
  filterValue: string;
  limit: number;
  offset: number;
}) {
  const values: Array<string | number> = [];
  const where: string[] = [];

  if (search) {
    values.push(`%${search}%`);
    const placeholder = `$${values.length}`;
    where.push(`("name" ILIKE ${placeholder} OR "email" ILIKE ${placeholder} OR "username" ILIKE ${placeholder})`);
  }

  if (filter !== "all" && filterValue) {
    values.push(filterValue);
    const column = filter === "role" ? "role" : "wished_role";
    where.push(`"${column}" = $${values.length}`);
  }

  const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const countResult = await pool.query<{ total: string }>(`SELECT COUNT(*)::text AS total FROM auth."user" ${whereClause}`, values);

  values.push(limit, offset);
  const rowsResult = await pool.query<AdminUserRow>(
    `SELECT "id", "name", "email", "image", "username", "role", "wished_role", "emailVerified", "banned", "createdAt"
     FROM auth."user"
     ${whereClause}
     ORDER BY "createdAt" DESC
     LIMIT $${values.length - 1} OFFSET $${values.length}`,
    values,
  );

  return { users: rowsResult.rows, total: Number(countResult.rows[0]?.total ?? 0) };
}
