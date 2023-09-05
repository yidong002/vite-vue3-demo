interface MockAxios {
  code: number;
  data: object[];
}
export default () => {
  const mockAxios = () => {
    return new Promise<MockAxios>((resolve, reject) => {
      setTimeout(() => {
        let list =<object []> [
          {
            year: 2015,
            type: '日用品',
            sale: '123'
          },
          {
            year: 2015,
            type: '食品',
            sale: '234'
          },
          {
            year: 2015,
            type: '图书',
            sale: '345'
          },
          {
            year: 2016,
            type: '日用品',
            sale: '456'
          },
          {
            year: 2016,
            type: '食品',
            sale: '567'
          },
          {
            year: 2016,
            type: '图书',
            sale: '678'
          },
          {
            year: 2017,
            type: '日用品',
            sale: '789'
          },
          {
            year: 2017,
            type: '食品',
            sale: '890'
          },
          {
            year: 2017,
            type: '图书',
            sale: '901'
          }
        ];
        resolve({code: 200, data: list}) ;
      }, 1000);
    });
  }
  return {
    mockAxios
  }
}