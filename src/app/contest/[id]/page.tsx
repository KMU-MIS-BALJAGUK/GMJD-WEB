// src/app/contest/[id]/page.tsx

type ContestDetailPageProps = {
  params: {
    id: string;
  };
};

export default function ContestDetailPage({ params }: ContestDetailPageProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Contest Detail Page</h1>
      <p>Details for contest with ID: {params.id}</p>
    </div>
  );
}
