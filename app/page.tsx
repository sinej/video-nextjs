import MainLayout from "@/app/layouts/mainLayout";
import ClientOnly from "@/app/components/clientOnly";
import PostMain from "@/app/components/post/postMain";

export default function Home() {
  return (
    <MainLayout>
        <div className="mt-20 w-[calc(100%-90px)] max-w-[690px] ml-auto">
            <ClientOnly>
                <PostMain post={{
                    id: '123',
                    user_id: '456',
                    video_url: '/184734-873923034_tiny.mp4',
                    text: 'this is some text',
                    created_at: 'date here',
                    profile: {
                        user_id: '456',
                        name: 'User 1',
                        image: 'https://placeholder.co/100',
                    }
                }} />
            </ClientOnly>
        </div>
    </MainLayout>
  );
}
