import {getNoteById} from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"
import { Metadata } from "next";

interface NotePageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({params}: NotePageProps):Promise<Metadata> {
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


const Page = async ({params}: NotePageProps) => {

    const {id} = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["noteById", id],
        queryFn: () => getNoteById(id),
    });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>

    );
};
export default Page