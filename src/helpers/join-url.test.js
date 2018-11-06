import { parseSearchParams } from "./join-url";


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
