export const c = (classNames: string[]): string => {
  return classNames.reduce((accumulator, currentClassName) => {
    return `${accumulator} ${currentClassName}`;
  }, ``);
};
