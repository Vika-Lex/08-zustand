import {getNoteById} from "@/lib/api";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"
interface NotePageProps {
    params: Promise<{id: string}>;
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