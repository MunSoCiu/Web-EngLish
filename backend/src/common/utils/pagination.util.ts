export function paginate(page = 1, limit = 10) {
  const take = Math.min(limit, 100);
  const skip = (page - 1) * take;

  return { take, skip };
}
