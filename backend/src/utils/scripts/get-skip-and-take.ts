export const getSkipAndTake = (page: number, cnt: number) : {skip: number, take: number} => {
  let skip;
  let take;

  if(page != null) {
    cnt ??= 10;
    skip = page * cnt
    take = cnt;
  }

  return {skip, take}
}