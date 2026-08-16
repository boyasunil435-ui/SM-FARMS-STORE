import { trpc } from "@/lib/trpc";

export function useAuth() {
  const utils = trpc.useUtils();
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
  });
  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      utils.auth.me.setData(undefined, null);
    },
  });

  return {
    loading: meQuery.isLoading,
    user: meQuery.data ?? null,
    logout: () => logoutMutation.mutate(),
    loggingOut: logoutMutation.isPending,
  };
}
