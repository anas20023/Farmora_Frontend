import UserManagementClient, { type ListedUser } from "@/components/dashboard/admin/UserManagementClient";
import { getAdminUsers } from "@/lib/admin-user-query";

const PAGE_SIZE = 10;

type UserSearchParams = {
  search?: string | string[];
  filter?: string | string[];
  filterValue?: string | string[];
  page?: string | string[];
};

function firstValue(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

function dateToString(value: Date | string) {
  return value instanceof Date ? value.toISOString() : value;
}

export default async function UserManagement({ searchParams }: PageProps<"/dashboard/admin/users">) {
  const params = (await searchParams) as UserSearchParams;
  const search = firstValue(params.search).trim().slice(0, 100);
  const requestedFilter = firstValue(params.filter);
  const filter = requestedFilter === "role" || requestedFilter === "wished_role" ? requestedFilter : "all";
  const filterValue = firstValue(params.filterValue).toLowerCase();
  const page = Math.max(1, Number.parseInt(firstValue(params.page), 10) || 1);
  const result = await getAdminUsers({ search, filter, filterValue, limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE });

  const users: ListedUser[] = result.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    username: user.username,
    role: user.role || "user",
    wishedRole: user.wished_role,
    emailVerified: user.emailVerified,
    banned: user.banned,
    createdAt: dateToString(user.createdAt),
  }));

  return <UserManagementClient users={users} total={result.total} page={page} pageSize={PAGE_SIZE} search={search} filter={filter} filterValue={filterValue} />;
}
