import Image from 'next/image';

export default function ContestCardSkeleton() {
  return (
    <div className="flex flex-col w-full sm:w-[280px] sm:h-[299px] animate-pulse">
      {/* 썸네일 (Image 기반) */}
      <div className="relative shrink-0 border border-border-1 rounded-lg overflow-hidden">
        <Image
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP4DwQACfsD/QwNGkoAAAAASUVORK5CYII="
          alt="skeleton-img"
          width={280}
          height={200}
          className="w-full h-[200px] object-cover opacity-0"
        />
        <div className="absolute inset-0 bg-gray-200" />
      </div>

      {/* 정보 */}
      <div className="pt-3 flex-grow">
        <div className="flex items-center gap-[6px] mb-[12px]">
          <div className="w-10 h-5 bg-gray-200 rounded" />
          <div className="w-16 h-5 bg-gray-200 rounded" />
        </div>

        <div className="w-3/4 h-4 bg-gray-200 rounded mb-2" />
        <div className="w-1/2 h-3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
