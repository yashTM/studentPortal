import type { AsyncState } from "@/lib/useAsync";
import { ErrorState, LoadingState } from "./States";

export default function AsyncView<T>({
  state,
  retry,
  label,
  children,
}: {
  state: AsyncState<T>;
  retry: () => void;
  label?: string;
  children: (data: T) => React.ReactNode;
}) {
  if (state.status === "loading") return <LoadingState label={label} />;
  if (state.status === "error") return <ErrorState message={state.message} onRetry={retry} />;
  return <>{children(state.data)}</>;
}
