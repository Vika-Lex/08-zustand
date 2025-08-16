import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import {getAllNotes, Sorting} from "@/lib/api";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({params}: PageProps):Promise<Metadata> {
    const {slug} = await params;
    const filterValue = slug[0];
    const tag = filterValue === 'All' ? '' : filterValue;

    return {
        title: 'List of notes',
        description: 'Explore notes filtered by ' + tag,
        openGraph: {
            title: 'List of notes',
            description: 'Explore notes filtered by ' + tag,
            url: `https://07-routing-nextjs-murex.vercel.app/notes/filter/${tag}`,
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

const Page = async ({params}: PageProps) => {
    const {slug} = await params;
    const filterValue = slug[0];

    const tag = filterValue === 'All' ? '' : filterValue;

    const queryClient = new QueryClient();
    const initialData = await getAllNotes('', 1, Sorting.CREATED, 10, tag);

    await queryClient.prefetchQuery({
        queryKey: ['notes', '', 1, tag],
        queryFn: () => getAllNotes('', 1, Sorting.CREATED, 10, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient filterTag={tag}
                         initialData={initialData}
            />
        </HydrationBoundary>

    );
};
export default Page