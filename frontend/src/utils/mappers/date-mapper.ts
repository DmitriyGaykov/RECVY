export const dateMapper = (dateWrapper: any, key: string = 'date') : any => {
  try {
    dateWrapper[key] = new Date(dateWrapper[key]);
    return dateWrapper;
  } catch {
    return dateWrapper
  }
}