'use client';
import NoteForm from "@/components/NoteForm/NoteForm";
import css from './CreateNote.module.css'


function CreateNoteClient() {
    return (
        <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
            <NoteForm/>
        </div>

    );
}

export default CreateNoteClient