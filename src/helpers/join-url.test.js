import { parseSearchParams, joinUrl } from "./join-url";

describe('parseSearchParams', () => {
  test('pass a search string and get an object with parsed params', () => {
    const searchString = 'name=freddie&surname=mercury';
    const result = {
      name: 'freddie',
      surname: 'mercury',
    }
    expect(parseSearchParams(searchString)).toEqual(result)  
  })
})

describe('joinUrl', () => {
  test('pass all params', () => {
    const params = { 
      url: 'http://google.com', 
      paths: ['calendar', 'days'], 
      searchParams: {
        hours: '8',
        minutes: '10',
      }
     };
    const result = 'http://google.com/calendar/days?hours=8&minutes=10';
    expect(joinUrl(params)).toEqual(result);  
  })
})
