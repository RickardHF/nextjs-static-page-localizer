

import { useSearchParams } from "next/navigation";

export function useDetermineLanguage() : string {
    const searchParams = useSearchParams();
    return searchParams.has("lang") ? searchParams.get("lang") as string : "xx";
}