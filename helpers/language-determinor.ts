

import { useSearchParams } from "next/navigation";

export default function useDetermineLanguage() : string {
    const searchParams = useSearchParams();
    return searchParams.has("lang") ? searchParams.get("lang") as string : "xx";
}