export const dateMapper = (dateWrapper: any, key: string = 'date') : any => {
  try {
    return {
      ...dateWrapper,
      [key]: new Date(Date.parse(dateWrapper[key]))
    };
  } catch {
    return dateWrapper
  }
}