import * as assert from 'assert';
import { HtmlUtility } from '../../html-utility';

suite('HtmlUtility tests', () => {

    const util = new HtmlUtility();

    suite('as_DD_MMM_YY tests', () => {
        test('should format a typical date as DD-MMM-YY', () => {
            const date = new Date(2025, 5, 11); // Jun 11, 2025
            const actual = util.as_DD_MMM_YY(date);
            assert.strictEqual(actual, '11-Jun-25');
        });

        test('should pad single-digit months and days', () => {
            const date = new Date(2023, 0, 5); // Jan 5, 2023
            const actual = util.as_DD_MMM_YY(date);
            assert.strictEqual(actual, '05-Jan-23');
        });

        test('should handle December correctly', () => {
            const date = new Date(2023, 11, 25); // Dec 25, 2023
            const actual = util.as_DD_MMM_YY(date);
            assert.strictEqual(actual, '25-Dec-23');
        });

        test('should handle years ending in 00', () => {
            const date = new Date(2000, 1, 2); // Feb 2, 2000
            const actual = util.as_DD_MMM_YY(date);
            assert.strictEqual(actual, '02-Feb-00');
        });

        test('should handle leap years', () => {
            const date = new Date(2016, 1, 29); // Feb 29, 2016
            const actual = util.as_DD_MMM_YY(date);
            assert.strictEqual(actual, '29-Feb-16');
        });
    });

    suite('as_YYYY_MM_DD tests', () => {
        const util = new HtmlUtility();

        test('should format a typical date as YYYY-MM-DD', () => {
            const date = new Date(2025, 5, 11); // Jun 11, 2025
            const actual = util.as_YYYY_MM_DD(date);
            assert.strictEqual(actual, '2025-06-11');
        });

        test('should pad single-digit months and days', () => {
            const date = new Date(2023, 0, 5); // Jan 5, 2023
            const actual = util.as_YYYY_MM_DD(date);
            assert.strictEqual(actual, '2023-01-05');
        });

        test('should handle December correctly', () => {
            const date = new Date(2023, 11, 25); // Dec 25, 2023
            const actual = util.as_YYYY_MM_DD(date);
            assert.strictEqual(actual, '2023-12-25');
        });

        test('should handle years ending in 00', () => {
            const date = new Date(2000, 1, 2); // Feb 2, 2000
            const actual = util.as_YYYY_MM_DD(date);
            assert.strictEqual(actual, '2000-02-02');
        });

        test('should handle leap years', () => {
            const date = new Date(2016, 1, 29); // Feb 29, 2016
            const actual = util.as_YYYY_MM_DD(date);
            assert.strictEqual(actual, '2016-02-29');
        });
    });

    suite('generateTimeElement tests', () => {
        const util = new HtmlUtility();

        test('should produce correct <time> element for a typical date', () => {
            const date = new Date(2025, 5, 11); // Jun 11, 2025
            const actual = util.generateTimeElement(date);
            assert.strictEqual(
                actual,
                '<time datetime="2025-06-11">11-Jun-25</time>'
            );
        });

        test('should produce correct <time> element for special date (Year: 00, single-digit days and months)', () => {
            const date = new Date(2000, 1, 2); // Feb 2, 2000
            const actual = util.generateTimeElement(date);
            assert.strictEqual(
                actual,
                '<time datetime="2000-02-02">02-Feb-00</time>'
            );
        });
    });

});