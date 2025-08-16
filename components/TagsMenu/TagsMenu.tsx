'use client';

import Link from "next/link";
import {useState} from "react";
import css from './TagsMenu.module.css';
import {CATEGORIES} from "@/constants";

const TagsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
        <div className={css.menuContainer}>
            <button onClick={toggle} className={css.menuButton}>Notes</button>
           { isOpen && (
               <ul className={css.menuList}>

                   {CATEGORIES.map((category) => (
                       <li key={category}
                           className={css.menuItem}
                       >
                           <Link href={`/notes/filter/${category}`}
                                 onClick={toggle}
                                 className={css.menuLink}
                           >
                               {category}
                           </Link>
                       </li>
                   ))}
               </ul>
           )}
        </div>
    );
};
export default TagsMenu