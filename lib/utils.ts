import { clsx, type ClassValue } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { REPORT_REASON } from './generated/prisma/enums';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeToDistance = (date: Date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    includeSeconds: true,
  });
};

export const formatReportReason = (reason: REPORT_REASON) => {
  switch (reason) {
    case REPORT_REASON.SPAM:
      return 'Spam';
    case REPORT_REASON.INAPPROPRIATE:
      return 'Inappropriate Content';
    case REPORT_REASON.HARASSMENT:
      return 'Harassment';
    case REPORT_REASON.HATE_SPEECH:
      return 'Hate Speech';
    case REPORT_REASON.SCAM:
      return 'Scam';
    case REPORT_REASON.SEXUAL_CONTENT:
      return 'Sexual Content';
    case REPORT_REASON.RACISM:
      return 'Racism';
    case REPORT_REASON.OTHER:
      return 'Other';
    default:
      return reason;
  }
};

export const formatUploadThingError = (errorMessage: string) => {
  if (errorMessage.includes('FileSizeMismatch')) {
    return 'File size does not match the expected size.';
  }
};
