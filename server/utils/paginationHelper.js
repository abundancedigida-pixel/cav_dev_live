
export const paginationHelper = ({
  page = 1,
  limit = 10,
  paginate = "true",
} = {}) => {
  const isPaginated = paginate !== "false";

  const currentPage = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 10, 1);

  return {
    paginate: isPaginated,
    page: currentPage,
    limit: pageSize,
    skip: isPaginated ? (currentPage - 1) * pageSize : 0,
  };
};
