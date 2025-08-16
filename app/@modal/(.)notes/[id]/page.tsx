import {getNoteById} from "@/lib/api";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { Metadata } from "next";


interface PreviewProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({params}: PreviewProps):Promise<Metadata> {
    const {id} = await params;
    const note = await getNoteById(id);

    return {
        title: note.title,
        description:  note.content,
        openGraph: {
            title: note.title,
            description: note.content,
            url: `https://07-routing-nextjs-murex.vercel.app/notes/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: "NoteHub Open Graph Image"
                }
            ]
        },
    }
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
