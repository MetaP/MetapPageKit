import * as assert from 'assert';
import { HtmlUtility } from '../../HtmlUtility';

suite('HtmlUtility tests', () => {

    const util = new HtmlUtility();

    test('should format a typical date correctly', () => {
        const date = new Date(2025, 5, 11); // Jun 11, 2025
        assert.strictEqual(util.as_DD_MMM_YY(date), '11-Jun-25');
    });

    test('should pad single-digit days with a leading zero', () => {
        const date = new Date(2023, 6, 3); // Jul 3, 2023
        assert.strictEqual(util.as_DD_MMM_YY(date), '03-Jul-23');
    });

    test('should handle December correctly', () => {
        const date = new Date(2023, 11, 25); // Dec 25, 2023
        assert.strictEqual(util.as_DD_MMM_YY(date), '25-Dec-23');
    });

    test('should use last two digits of the year', () => {
        const date = new Date(1999, 10, 15); // Nov 15, 1999
        assert.strictEqual(util.as_DD_MMM_YY(date), '15-Nov-99');
    });

    test('should handle years ending in 00', () => {
        const date = new Date(2000, 1, 29); // Feb 29, 2000 (leap year)
        assert.strictEqual(util.as_DD_MMM_YY(date), '29-Feb-00');
    });

    test('should handle single-digit months correctly', () => {
        const date = new Date(2023, 8, 9); // Sep 9, 2023
        assert.strictEqual(util.as_DD_MMM_YY(date), '09-Sep-23');
    });

});