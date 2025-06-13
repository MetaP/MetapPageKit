// /**
//  * Represents a parsed part of the template.
//  */
// export type TemplatePart = Literal | Parameter;

// export interface Literal {
//     type: 'literal';
//     value: string;
// }

// export interface Parameter {
//     type: 'parameter';
//     value: string;
// }

export class Template {
    private literals: string[];
    private placeholders: string[];

    public readonly parameters: string[];

    constructor(template: string) {
        const { literals, placeholders } = Template.parse(template);
        this.literals = literals;
        this.placeholders = placeholders;
        this.parameters = Array.from(new Set(placeholders));
    }

    /**
     * Parses the template into separate arrays of literals and placeholders.
     * @param template The template string containing {name} placeholders.
     * @returns Object with literals and placeholders arrays.
     */
    static parse(template: string): { literals: string[]; placeholders: string[] } {
        const literals: string[] = [];
        const placeholders: string[] = [];
        let lastIndex = 0;
        const regex = /\{(\w+)\}/g;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(template)) !== null) {
            literals.push(template.slice(lastIndex, match.index));
            placeholders.push(match[1]);
            lastIndex = regex.lastIndex;
        }
        literals.push(template.slice(lastIndex));
        return { literals, placeholders };
    }

    /**
     * Generates the template using the provided parameter values.
     * @param parameters Object mapping parameter names to values.
     * @returns The generated string.
     */
    generate(parameters: Record<string, string>): string {
        let result = '';
        for (let i = 0; i < this.placeholders.length; i++) {
            result += this.literals[i];
            const param = this.placeholders[i];
            result += parameters[param] !== undefined ? parameters[param] : `{${param}}`;
        }
        result += this.literals[this.literals.length - 1];
        return result;
    }
}