'use client';

import css from './page.module.css';
import * as NoteService from "@/lib/api";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import {Sorting} from "@/lib/api";
import {Note} from "@/types/note";

interface NotesProps {
    initialData: {
        notes: Note[];
        totalPages: number;
    }
    filterTag?: string;
}
const Notes = ({initialData, filterTag}:NotesProps) => {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery] = useDebounce(query, 500);
    const [page, setPage] = useState<number>(1);
    const [tag, setTag] = useState(filterTag);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        setTag(filterTag);
        setPage(1)
    }, [filterTag]);


    const {data, isError, isLoading} = useQuery({
        queryKey: ['notes', debouncedQuery, page, tag],
        queryFn: () => NoteService.getAllNotes(debouncedQuery, page, Sorting.CREATED, 10, tag),
        placeholderData: keepPreviousData,
        initialData
    })

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const onOpenModal = () => {
        setIsModalOpen(true);
    }

    const onCloseModal = () => {
        setIsModalOpen(false);
    }

    const setSearchQuery = (searchQuery: string) => {
        setQuery(searchQuery);
        setPage(1);
    }

    return (
        <div>
            <div className={`container ${css.searchBar}`}>
                <SearchBox query={query}
                           setQuery={setSearchQuery}
                />
                {data && data.totalPages > 1 && (
                    <Pagination page={page}
                                setPage={setCurrentPage}
                                totalPages={data.totalPages}
                    />
                )}

                <button className={css.button}
                        onClick={onOpenModal}
                >Create note +
                </button>
            </div>
            {isModalOpen && (
                <Modal onCloseModal={onCloseModal}>
                    <NoteForm onClear={onCloseModal}/>
                </Modal>
            )}
            {isLoading && <p className={css.loading}>Loading, please wait...</p>}
            {isError && <p className={css.error}>Something went wrong.</p>}
            {data && data.notes && data.notes.length > 0 && (
                <NoteList notes={data?.notes}/>
            )}

        </div>

    );
};
export default Notes