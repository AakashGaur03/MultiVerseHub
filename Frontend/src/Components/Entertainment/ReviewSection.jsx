import React from "react";
import { Card } from "react-bootstrap";
import { formatDateinHumanredable } from "../../GlobalComp/formatDate";
import DOMPurify from "dompurify";

const ReviewSection = ({ reviewsData }) => {
  const getAbrivated = (name) => {
    let names = name.split(" ");
    if (names.length > 1) return `${names[0][0]} ${names[1][0]}`;
    else return `${names[0].slice(0, 2)}`;
  };
  return (
    <div className="container mb-5 bg-slate-900 rounded-3xl">
      <div className="mt-3 pt-4 mb-3 px-5 uppercase font-semibold text-2xl text-gray-300 text-center">Reviews</div>
      <div className="overflow-y-auto max-h-80">
        {reviewsData?.results?.length > 0 ? (
          reviewsData?.results?.map((review, index) => {
            const sanitizedContent = DOMPurify.sanitize(review.content);
            return (
              <div key={review.id}>
                <div className="mb-5">
                  <div className="flex items-center">
                    <div>
                      {review.author_details.avatar_path ? (
                        <img
                          variant="top"
                          className="h-14 w-14 rounded-full mb-2"
                          alt="Author Image"
                          src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                        />
                      ) : (
                        <div className="h-14 w-14 rounded-full mb-2 bg-slate-700 flex justify-center items-center">
                          {getAbrivated(review.author)}
                        </div>
                      )}
                    </div>
                    <div className="ms-10 w-full justify-between flex flex-wrap">
                      <div className="text-2xl">A review by {review.author}</div>
                      <div>Written On : {formatDateinHumanredable(review.updated_at)}</div>
                    </div>
                  </div>
                  <hr />
                  <div className="mt-5 text-gray-300" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>

                  <img alt="" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="mb-5 ps-5">No Reviews Available</div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
