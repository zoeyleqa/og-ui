export const concatData = (row: { values: any }, column: string) => {
  return row.values[column]
    .reduce((prev: any[], curr: { name: string }) => {
      return [...prev, curr.name.trim()];
    }, [])
    .join(", ");
};
