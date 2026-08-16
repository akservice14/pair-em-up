// StorageService.js

// Objects: 'app', 'autoSaved', 'userSaved'.

class StorageService {
  constructor() {
    this.root = {};
    this._loadRoot();
  }

  _loadRoot () {
    const stored = localStorage.getItem('root');
    this.root = stored ? JSON.parse(stored) : {};
  }

  saveObject(objectName, objectToSave) {
    this._loadRoot();
    this.root[objectName] = objectToSave;
    localStorage.setItem('root', JSON.stringify(this.root));
  }

  getObject(objectName) {
    this._loadRoot();
    return this.root[objectName];
  }

  clearGame() {
    this._loadRoot();
    this.root['autoSaved'] = null;
    localStorage.setItem('root', JSON.stringify(this.root));
  }

  clearStorage() {
    localStorage.clear();
  }
}

export { StorageService }
