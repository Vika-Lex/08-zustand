import {getNoteById} from "@/lib/api";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";


interface PreviewProps {
    params: Promise<{ id: string }>;
}


export default async function NotePreviewPage ({params}: PreviewProps) {
    const {id} = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => getNoteById(id)
    })


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient/>
        </HydrationBoundary>
    );
};
