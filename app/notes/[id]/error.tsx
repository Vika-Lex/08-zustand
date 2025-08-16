'use client'

interface ErrorProps {
    error: Error;
    digest?: string;
}
const Error = ({error}:ErrorProps) => {

    return (
        <p>
            Could not fetch the list of notes. {error.message}
        </p>
    );
};
export default Error