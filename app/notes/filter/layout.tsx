import css from './layout.module.css';
import {ReactNode} from "react";

interface LayoutProps {
    sidebar: ReactNode;
    children: ReactNode;

}

const NotesLayout = ({sidebar, children}: LayoutProps) => {
    return (
        <div className={css.container}>
            <div className={css.sidebar}>
                {sidebar}
            </div>
            <div className={css.main}>
                {children}

            </div>
        </div>
    );
};
export default NotesLayout