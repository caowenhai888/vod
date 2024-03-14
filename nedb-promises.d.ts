declare module 'nedb' {

    export class Datastore<T> {
  
      constructor(pathOrOptions: string | Nedb.DataStoreOptions);
  
      insert(newDoc: T, cb?: (err: Error | null, document: T) => void): void;
  
      // ... 其他 methods
    }
  
    namespace Nedb {
  
      interface DataStoreOptions {
        filename?: string;
        inMemoryOnly?: boolean;
        autoload?: boolean;
        onload?: (error: Error) => void;
        // ...
      }
  
      // ...
    }
  }