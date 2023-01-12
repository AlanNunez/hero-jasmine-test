import { StrengthPipe } from './strength.pipe';

describe('Pipe should transform to either weak or strong', () => {

  it('should be weak', () => {
    // arrange
      let pipe = new StrengthPipe();
    //act
      let transform = pipe.transform(5);
    //assert
    expect(transform).toBe('5 (weak)');
  })

  it('should be strong', () => {
    // arrange
      let pipe = new StrengthPipe();
    //act
      let transform = pipe.transform(10);
    //assert
    expect(transform).toBe('10 (strong)');
  })
})
