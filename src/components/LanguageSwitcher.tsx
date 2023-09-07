import Link from "next/link";

interface LanguageSwitcherProps {
    lang: string,
    className: string,
    children: React.ReactNode
}

export default function LanguageSwitcher(props: LanguageSwitcherProps) {
    const href = {
        query: {
            lang: props.lang
        }
    }

    return (
        <Link href={href} className={props.className}>
            {props.children}
        </Link>
    );
}
