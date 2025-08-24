'use client'

import css from './NoteForm.module.css';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as NoteService from "@/lib/api";
import {useNoteDraftStore} from "@/lib/store/noteStore";
import { useRouter } from 'next/navigation';

const NoteForm = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const {draft, setDraft, clearDraft} = useNoteDraftStore()

    const mutation = useMutation({
        mutationFn: NoteService.createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notes']
            });
            clearDraft();
            router.back()
        },
        onError: (error) => {
            console.error('Error creating note:', error);
        },
    })

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        const updatedDraft = {
            ...draft,
            [name]: value,
        }
        setDraft(updatedDraft);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('draft', draft)
        mutation.mutate(draft);
    };



    return (
        <form className={css.form}
              onSubmit={handleSubmit}
        >
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input id="title"
                       type="text"
                       name="title"
                       value={draft.title}
                       onChange={handleChange}
                       className={css.input}
                />

            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={draft.content}
                    onChange={handleChange}
                    rows={8}
                    className={css.textarea}
                />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag"
                        name="tag"
                        value={draft.tag}
                        onChange={handleChange}
                        className={css.select}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button"
                        className={css.cancelButton}
                        onClick={()=> router.back()}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                >
                    Create note
                </button>
            </div>
        </form>
    );
};
export default NoteForm