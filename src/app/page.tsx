import BarNavigation from "@/components/BarNavigation";
import Main from "@/components/Main";

interface HomeProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary">
      <BarNavigation />
      <Main searchParams={searchParams} />
    </div>
  );
}