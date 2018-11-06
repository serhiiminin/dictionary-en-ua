import { parseSearchParams, joinUrl, joinRoute } from "./join-url";

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
      url: 'http://google.com/', 
      paths: ['calendar', 'days'], 
      searchParams: {
        hours: '7',
        minutes: '10',
      }
     };
    const result = 'http://google.com/calendar/days?hours=7&minutes=10';
    expect(joinUrl(params)).toEqual(result);  
  })

  test('not to pass paths', () => {
    const params = { 
      url: 'http://google.com/', 
      searchParams: {
        hours: '7',
        minutes: '10',
      }
     };
    const result = 'http://google.com/?hours=7&minutes=10';
    expect(joinUrl(params)).toEqual(result);  
  })

  test('not to pass search params', () => {
    const params = { 
      url: 'http://google.com/', 
      paths: ['calendar', 'days'],
     };
    const result = 'http://google.com/calendar/days';
    expect(joinUrl(params)).toEqual(result);  
  })
})

describe('joinRoute', () => {
  test('pass all params', () => {
    const params = { 
      pathname: 'main',
      paths: ['id'],
      search: 'name=freddie', 
      searchParams: {
        surname: 'mercury'
      } 
    };
    const result = 'main/id?name=freddie&surname=mercury';
    expect(joinRoute(params)).toEqual(result);  
  })

  test('not to pass paths', () => {
    const params = { 
      pathname: 'main',
      search: 'name=freddie', 
      searchParams: {
        surname: 'mercury'
      } 
    };
    const result = 'main?name=freddie&surname=mercury';
    expect(joinRoute(params)).toEqual(result);  
  })

  test('not to pass search', () => {
    const params = { 
      pathname: 'main',
      paths: ['id'], 
      searchParams: {
        surname: 'mercury'
      } 
    };
    const result = 'main/id?surname=mercury';
    expect(joinRoute(params)).toEqual(result);  
  })

  test('not to pass search params', () => {
    const params = { 
      pathname: 'main',
      paths: ['id'], 
      search: 'name=freddie',
    };
    const result = 'main/id?name=freddie';
    expect(joinRoute(params)).toEqual(result);  
  })
})
