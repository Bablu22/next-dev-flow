import { SignedIn } from "@clerk/nextjs";
import RenderTag from "../shared/RenderTag";
import Link from "next/link";
import Metric from "../shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

interface QuestionProps {
  _id: number;
  title: string;
  tags: { _id: number; name: string }[];
  author: string;
  upvotes: number;
  downvotes: number;
  views: number;
  answers: number;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  downvotes,
  views,
  answers,
  createdAt,
  clerkId,
}: QuestionProps) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
        <SignedIn>
          {/* {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )} */}
        </SignedIn>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="flex-start flex-wrap gap-3">
          <Metric
            imgUrl="/assets/icons/avatar.svg"
            alt="User"
            value={author}
            title={` • asked ${getTimestamp(createdAt)}`}
            href={`/profile/$`}
            isAuthor
            textStyles="body-medium text-dark400_light700"
          />
        </div>
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/upvote.svg"
            alt="Upvotes"
            value={formatAndDivideNumber(upvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/downvote.svg"
            alt="Downvotes"
            value={formatAndDivideNumber(downvotes)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={formatAndDivideNumber(answers)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={formatAndDivideNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
