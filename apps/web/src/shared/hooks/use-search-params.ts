import { usePathname, useSearchParams as useSearchParamsNext } from "next/navigation";

export const useSearchParams = () => {
  const pathname = usePathname();
  const searchParams = useSearchParamsNext();

  return (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return pathname + "?" + params.toString();
  };
};
