import Link from 'next/link';
import css from "./SidebarNotes.module.css";
import {CATEGORIES} from "@/constants";

const NotesSidebar = () => {


    return (
        <>
            <h2 className={css.title}>Filter by Tag</h2>
            <ul className={css.menuList}>
                {CATEGORIES.map((category) => (
                    <li key={category} className={css.menuItem}>
                        <Link href={`/notes/filter/${category}`} className={css.menuLink}>
                            {category}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default NotesSidebar;