import Link from "next/link";
import React from "react";
import { useDetermineLanguage } from "../helpers/language-determinor";

interface LocalizedLinkProps {
    href: string,
    className: string,
    children: React.ReactNode
}

export default function LocalizedLink(props: LocalizedLinkProps) {
    const language = useDetermineLanguage();

    const href = {
        pathname: props.href,
        query: {}
    }

    if (language && language !== "xx") {
        href.query = { lang: language }
    }

    return (
        <Link href={href} className={props.className}>
            {props.children}
        </Link>
    );
};
