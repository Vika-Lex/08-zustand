import { Metadata } from 'next';
import CreateNoteClient from './СreateNote.client';

export const metadata: Metadata = {
    title: 'Create Note - NoteHub',
    description: 'Start a new note in NoteHub — add a title, write content, and manage it with tags.',
    openGraph: {
        title: 'Create Note - NoteHub',
        description: 'Start a new note in NoteHub — add a title, write content, and manage it with tags.',
        url: '/notes/action/create',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'Create Note - NoteHub',
            },
        ],
    },
};

function CreateNote() {
    return <CreateNoteClient />;
}

export default CreateNote;