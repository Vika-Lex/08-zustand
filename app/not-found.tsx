import css from './page.module.css'

export const metadata = {
    title: 'NoteHub - Page Not Found',
    description: 'The page you are looking for does not exist.',
    url: 'http://localhost:3000/not-found',
    openGraph: {
        title: "NoteHub - Page Not Found",
        description: "The page you are looking for does not exist.",
        url: "http://localhost:3000/not-found",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub Open Graph Image"
            }
        ]
    }
}
const NotFound = () => {

    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
};
export default NotFound