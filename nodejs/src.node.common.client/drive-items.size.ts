import { getAttrQuerySelector } from "./dom.selectors.js";

export const driveItemConstValues = Object.freeze({
  attrNames: {
    driveItemUuid: "trmrk-drive-item-uuid",
  },
});

export const getDriveItemUuidQuerySelector = (itemUuid: string) => {
  const querySelector = getAttrQuerySelector(
    driveItemConstValues.attrNames.driveItemUuid,
    itemUuid
  );

  return querySelector;
};

export const getDriveItemDomEl = (
  itemUuid: string,
  parentDomEl?: HTMLElement | Document | null | undefined
): HTMLElement | null => {
  const querySelector = getDriveItemUuidQuerySelector(itemUuid);
  parentDomEl = parentDomEl ?? document;

  const domEl = parentDomEl.querySelector(querySelector) as HTMLElement;
  return domEl;
};

export const updateDriveItemWidth = (
  itemUuid: string,
  width: string,
  parentDomEl?: HTMLElement | Document | null | undefined
) => {
  let retVal = false;
  const domEl = getDriveItemDomEl(itemUuid, parentDomEl);

  if (domEl) {
    domEl.style.width = width;
    retVal = true;
  }

  return retVal;
};
