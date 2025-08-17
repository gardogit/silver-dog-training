import React from 'react';
import { FaStar } from 'react-icons/fa';
import { SiGoogle } from 'react-icons/si';
import Image from 'next/image';

export interface ReviewData {
    id: string;
    authorName: string;
    authorPhotoUrl?: string;
    reviewText: string;
    rating: number; 
    relativeTime: string;
}

interface ReviewCardProps {
    review: ReviewData;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center text-yellow-500">
            {Array.from({ length: 5 }, (_, index) => (
                <FaStar
                    key={index}
                    className={index < rating ? 'text-yellow-400' : 'text-neutral-300'}
                />
            ))}
        </div>
    );
};

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-white p-6 rounded-lg border-3 border-neutral-200 h-full flex flex-col">
            <div className="flex items-start mb-4">
                {review.authorPhotoUrl ? (
                    <Image
                        src={review.authorPhotoUrl}
                        alt={review.authorName}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full mr-4 bg-orange-100 text-orange-500 flex items-center justify-center text-xl font-bold">
                        {review.authorName.charAt(0)}
                    </div>
                )}
                <div className="flex-grow">
                    <h3 className="font-bold text-neutral-800">{review.authorName}</h3>
                    <p className="text-sm text-neutral-500">{review.relativeTime}</p>
                </div>
                <SiGoogle className="w-6 h-6 text-neutral-400 flex-shrink-0" />
            </div>

            <div className="mb-4">
                <StarRating rating={review.rating} />
            </div>

            <p className="text-neutral-600 leading-relaxed flex-grow">
            &quot;{review.reviewText}&quot;
            </p>
        </div>
    );
};