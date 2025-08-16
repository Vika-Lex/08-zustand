'use client'

import css from './page.module.css';
import {formatDate} from "@/lib/date";
import {useQuery} from "@tanstack/react-query";
import * as NoteService from "@/lib/api";
import {useParams} from "next/navigation";


// interface NoteDetailsProps {
//     initialData: Note,
// }
const NoteDetailsClient = () => {
const {id} = useParams() as {id: string};

    const {data:noteById, isLoading, isError} = useQuery({
        queryKey: ['noteById', id],
        queryFn: () => NoteService.getNoteById(id),
        refetchOnMount: false,
    })

    if (isLoading) return <p className={css.loading}>Loading...</p>;

    if (isError || !noteById) return <p className={css.error}>Something went wrong.</p>;

    return (
        <>

           {noteById && (
               <div className={css.container}>
                   <div className={css.item}>
                       <div className={css.header}>
                           <h2>{noteById.title}</h2>
                       </div>
                       <p className={css.content}>{noteById.content}</p>
                       <p className={css.date}>{formatDate(noteById.createdAt)}</p>

                   </div>
               </div>
           )}
       </>
    );
};
export default NoteDetailsClient