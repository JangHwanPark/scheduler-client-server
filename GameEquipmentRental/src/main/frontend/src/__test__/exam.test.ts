import { sum } from './sum';

// Todo : jsdom is not defined 에러 발생 - 종속성 설치시 충돌발생
describe('[Jest Testing] sum function', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(-1, 1)).toBe(0);
        expect(sum(0, 0)).toBe(0);
    });

    it('should return the correct sum for negative numbers', () => {
        expect(sum(-2, -3)).toBe(-5);
        expect(sum(-1, -1)).toBe(-2);
    });
});