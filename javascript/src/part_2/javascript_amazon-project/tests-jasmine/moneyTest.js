import { formatCurrency } from '../scripts/utils/money.js';

describe('test suite: formatCurreny', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    describe('rounds up to the nearest cent', () => {
        it('round 1', () => {
            expect(formatCurrency(2000.5)).toEqual('20.01');
        });

        it('round 2', () => {
            expect(formatCurrency(2000.4)).toEqual('20.00');
        });
    });

});

