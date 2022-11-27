const paginate = (followers) => {
  const itensPerPage = 8;
  const numbersOfPages = Math.ceil(followers.length / itensPerPage);
  const newFollowers = Array.from({ length: numbersOfPages }, (_, index) => {
    const start = index * itensPerPage;
    return followers.slice(start, start + itensPerPage);
  });

  return newFollowers;
};

export default paginate;
