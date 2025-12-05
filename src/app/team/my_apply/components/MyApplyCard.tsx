"use client";

import Image from "next/image";
import Button from "@/components/common/Button";
import Tag from "@/components/common/Tag";
import { UsersRound } from "lucide-react";
import { useCancelApplication } from "@/hooks/mypage/useCancelApplication";

export interface MyApplyCardProps {
  teamId: number;
  title: string;
  subtitle: string;
  image: string;
  memberCount: number;
  maxMember: number;
  recruitStatus: "\ubaa8\uc9d1\uc911" | "\ubaa8\uc9d1\uc644\ub8cc";
  onCardClick: (teamId: number) => void;
}

export default function MyApplyCard({
  teamId,
  title,
  subtitle,
  image,
  memberCount,
  maxMember,
  recruitStatus,
  onCardClick,
}: MyApplyCardProps) {
  const { mutate: cancelApplication, isPending: isCancelling } = useCancelApplication();
  const isRecruitOpen = recruitStatus === "\ubaa8\uc9d1\uc911";

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    cancelApplication({ teamId });
  };

  const renderActionButton = () => {
    return isRecruitOpen ? (
      <Button
        className="w-full mt-4 bg-[#fdeaea] text-[#d65c5c] hover:bg-[#f7dada]"
        variant="ghost"
        disabled={isCancelling}
        onClick={handleCancel}
      >
        {isCancelling ? "\ucde8\uc18c \uc9c4\ud589\uc911..." : "\uc2e0\uccad \ucde8\uc18c"}
      </Button>
    ) : (
      <Button
        className="w-full mt-4 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer border border-gray-300"
        variant="ghost"
        disabled
      >
        ???
      </Button>
    );
  };

  return (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md bg-white hover:scale-105 transition duration-300 cursor-pointer flex flex-col"
      onClick={() => onCardClick(teamId)}
    >
      <div className="relative w-full h-[160px] bg-gray-100">
        <Image
          src={image || "/profile-image.png"}
          alt={title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute bottom-2 left-2">
          {isRecruitOpen ? (
            <Tag variant="green" shape="square" className="text-xs">
              ???
            </Tag>
          ) : (
            <Tag variant="gray" shape="square" className="text-xs">
              ????
            </Tag>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="font-semibold text-sm leading-tight line-clamp-2">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>

        <p className="flex items-center gap-1 text-sm mt-2">
          <UsersRound size={15} /> ?? ?? {maxMember}?/
          <span className="text-blue font-semibold ml-1">?? {memberCount}?</span>
        </p>

        <div className="mt-auto pt-4 h-[44px] flex items-end">{renderActionButton()}</div>
      </div>
    </div>
  );
}
