import { suite, test } from 'mocha';
import { strict as assert } from 'assert';
import { Template } from '../../template';

suite('Template tests', function() {
    suite('constructor tests', function() {
        test('should extract literals, placeholders and parameters', function() {
            const t = new Template('Hello {name}, your id is {id}.');
            assert.deepEqual((t as any).literals, ['Hello ', ', your id is ', '.']);
            assert.deepEqual((t as any).placeholders, ['name', 'id']);
            assert.deepEqual(t.parameters, ['name', 'id']);
        });
    });

    suite('parameters tests', function() {
        test('should return all unique parameter names in order of appearance', function() {
            const t = new Template('Hello {a} {b} {a} {c} {b} {a} {d}'); // 3 x 'a', 2 x 'b' 
            assert.deepEqual(t.parameters, ['a', 'b', 'c', 'd']);
        });

        test('should return empty array if no parameters', function() {
            const t = new Template('no placeholders');
            assert.deepEqual(t.parameters, []);
        });

        test('should handle single parameter', function() {
            const t = new Template('only {x}');
            assert.deepEqual(t.parameters, ['x']);
        });
    });

    suite('parse tests', function() {
        test('should parse literals and placeholders', function() {
            const result = Template.parse('A {x} and {y}!');
            assert.deepEqual(result.literals, ['A ', ' and ', '!']);
            assert.deepEqual(result.placeholders, ['x', 'y']);
        });

        test('should handle no start literal', function() {
            const result = Template.parse('{x}.');
            assert.deepEqual(result.literals, ['','.']);
            assert.deepEqual(result.placeholders, ['x']);
        });

        test('should handle no end literal', function() {
            const result = Template.parse('Hello {x}');
            assert.deepEqual(result.literals, ['Hello ', '']);
            assert.deepEqual(result.placeholders, ['x']);
        });

        test('should handle adjacent placeholders', function() {
            const result = Template.parse('Start{x}{y}end.');
            assert.deepEqual(result.literals, ['Start', '', 'end.']);
            assert.deepEqual(result.placeholders, ['x', 'y']);
        });

        test('should handle no placeholders', function() {
            const result = Template.parse('plain');
            assert.deepEqual(result.literals, ['plain']);
            assert.deepEqual(result.placeholders, []);
        });
        test('should handle all placeholder', function() {
            const result = Template.parse('{x}');
            assert.deepEqual(result.literals, ['', '']);
            assert.deepEqual(result.placeholders, ['x']);
        });

        test('should handle empty template', function() {
            const result = Template.parse('');
            assert.deepEqual(result.literals, ['']);
            assert.deepEqual(result.placeholders, []);
        });
    });

    suite('generate tests', function() {
        test('should generate string for "A {x} and {y}!"', function() {
            const t = new Template('A {x} and {y}!');
            const out = t.generate({ x: 'foo', y: 'bar' });
            assert.equal(out, 'A foo and bar!');
        });

        test('should handle a template with no start literal"', function() {
            const t = new Template('{x}.');
            const out = t.generate({ x: 'foo' });
            assert.equal(out, 'foo.');
        });

        test('should handle a template with no end literal', function() {
            const t = new Template('Hello {x}');
            const out = t.generate({ x: 'foo' });
            assert.equal(out, 'Hello foo');
        });

        test('should handle a template with adjacent placeholders', function() {
            const t = new Template('start|{x}{y}|end');
            const out = t.generate({ x: 'foo', y: 'bar' });
            assert.equal(out, 'start|foobar|end');
        });

        test('should handle a template with no placeholders', function() {
            const t = new Template('plain');
            const out = t.generate({});
            assert.equal(out, 'plain');
        });

        test('should handle a template that is a placeholder', function() {
            const t = new Template('{x}');
            const out = t.generate({ x: 'foo' });
            assert.equal(out, 'foo');
        });

        test('should handle empty template', function() {
            const t = new Template('');
            const out = t.generate({});
            assert.equal(out, '');
        });

        test('should leave placeholders without values', function() {
            const t = new Template('Hello {name}, your id is {id}.');
            const out = t.generate({ name: 'Bob' });
            assert.equal(out, 'Hello Bob, your id is {id}.');
        });

        test('should handle repeated parameters', function() {
            const t = new Template('{x}-{x}-{y}');
            const out = t.generate({ x: 'A', y: 'B' });
            assert.equal(out, 'A-A-B');
        });
    });
});
