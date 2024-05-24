import documents, { documentAnchorsExp } from '@mocks/documents'
import useBuildAnchors from '@hooks/useBuildAnchors'
describe('test useBuildAnchors', () => {
  test('should return an Anchors array', () => {
    const anchors = useBuildAnchors(documents)
    expect(anchors).toStrictEqual(documentAnchorsExp)
  })
})
