export class IntIdGenerator {
  private _currentId = 1;
  constructor() {
    this.getNextId = this.getNextId.bind(this);
  }

  public getNextId() {
    const nextId = this._currentId++;
    return nextId;
  }
}

export const intIdGenerator = new IntIdGenerator();
