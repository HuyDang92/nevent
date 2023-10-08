import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
// Thu hẹp error có kiểu dữ liệu không xác định về 'FetchBaseQueryError'

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
};

// Thu hẹp error có kiểu dữ liệu không xác định về chứa messagge'

export const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return (
    typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string'
  );
};
