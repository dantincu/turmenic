export class IntIdGenerator {
  private _currentId = 1;

  public getNextId() {
    const nextId = this._currentId++;
    return nextId;
  }
}

export const defaultIntIdGenerator = new IntIdGenerator();
