const LIMIT_FALLBACK = 10;
const PAGE_FALLBACK = 1;

export const getPaginationOptions = (options: {
  pageSize?: number;
  page?: number;
}) => ({
  limit: options?.pageSize ?? LIMIT_FALLBACK,
  offset:
    ((options?.page ?? PAGE_FALLBACK) - 1) *
    (options?.pageSize ?? LIMIT_FALLBACK),
});
