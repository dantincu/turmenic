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

export const updateParentWidth = (opts: {
  uuid: string;
  parentUuid: string;
}) => {
  const domEl = document.querySelectorAll(`[trmrk-uuid="${opts.uuid}"]`)[0];
  const domElWidth = domEl.clientWidth + domEl.clientLeft;

  const parentDomEl = document.querySelectorAll(
    `[trmrk-uuid="${opts.parentUuid}"]`
  )[0] as HTMLElement;

  const parentDomElClientLeft = parentDomEl.clientLeft;

  const domElSubNodesMaxWidth = [...domEl.querySelectorAll("[trmrk-uuid]")]
    .map((el) => el.clientLeft + el.clientWidth)
    .reduce((prev, crnt) => Math.max(prev, crnt), 0);

  const domElAllNodesMaxWidth = Math.max(domElSubNodesMaxWidth, domElWidth);

  parentDomEl.style.width = `${
    domElAllNodesMaxWidth - parentDomElClientLeft
  }px`;
};
