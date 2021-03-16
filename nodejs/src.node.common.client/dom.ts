export const getClassListExcept = (
  classList: DOMTokenList,
  ...except: string[]
) => {
  const retClassList: string[] = [];

  for (let i = 0; i < classList.length; i++) {
    if (except.indexOf(classList[i]) < 0) {
      retClassList.push(classList[i]);
    }
  }

  return retClassList;
};

export const removeAllClassList = (
  classList: DOMTokenList,
  ...except: string[]
) => {
  const classListArr = getClassListExcept(classList, ...except);

  classListArr.forEach((val) => {
    classList.remove(val);
  });

  return classListArr;
};

export const replaceClassList = (
  classList: DOMTokenList,
  except: string[],
  ...newClasses: string[]
) => {
  removeAllClassList(classList, ...except);

  newClasses.forEach((val) => {
    classList.add(val);
  });
};
