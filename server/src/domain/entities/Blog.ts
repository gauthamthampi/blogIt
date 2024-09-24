export class Blog {
    constructor(
      public title: string,
      public content: string,
      public image: string,
      public writtenby: string,
      public createdAt: Date
    ) {}
  }