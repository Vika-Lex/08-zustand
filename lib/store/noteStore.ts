import { create } from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import {NewNoteData} from "@/types/note";

type NoteDraftStore = {
    draft: NewNoteData,
    setDraft: (draft: NewNoteData) => void,
    clearDraft: () => void
};

const initialState: NewNoteData = {
    title: '',
    content: '',
    tag: 'Todo'
}

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialState,
            setDraft: (note: NewNoteData) => set((state) => ({ ...state, draft: note })),
            clearDraft: () => set((state) => ({ ... state, draft: initialState })),
        }),
        {
            name: "note-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({draft: state.draft})

        }
    )
)