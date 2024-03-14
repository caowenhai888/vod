

interface UserData {
    _id?: string;
    username: string;
    password: string;
    createTime?: string;
  }

  
export class User {
  _id?: string;
  username: string;
  password: string;
  createTime?: string;

  constructor(data: UserData) {
    this._id = data._id;
    this.username = data.username;
    this.password = data.password;
  }
  getPropertiesWithoutId(): object { 
    const properties = {} as any; 
    for (const key in this) { 
      if (key !== '_id') { 
        properties[key] = this[key]; 
      } 
    } 
    return properties; 
  }
}