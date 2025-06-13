export class HtmlUtility {
    private monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    /**
     * Converts a given Date to a string with the format "DD-MMM-YY".
     *
     * @param date - The Date object to format.
     * @returns A string representing the date in "DD-MMM-YY" format, where:
     *   - DD is the two-digit day (01-31),
     *   - MMM is the three-letter month abbreviation,
     *   - YY is the last two digits of the year (00-99).
     */
    public as_DD_MMM_YY(date: Date): string {
        const dd = String(date.getDate()).padStart(2, '0');
        const mmm = this.monthNames[date.getMonth()];
        const yy = String(date.getFullYear()).slice(-2);

        return `${dd}-${mmm}-${yy}`;
    }

    /**
     * Converts a given Date to a string in the format 'YYYY-MM-DD'.
     *
     * @param date - The Date object to format.
     * @returns A string representing the date in 'YYYY-MM-DD' format, where:
     *   - YYYY is the four-digit year,
     *   - MM is the two-digit month (01-12),
     *   - DD is the two-digit day (01-31).
     */
    public as_YYYY_MM_DD(date: Date): string {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    }

    // Produces a <time> element for the current date in the format:
    // <time datetime="YYYY-MM-DD">DD-MMM-YY</time>


    /**
     * Returns an HTML `<time>` element string for the given date.
     *
     * @param date - The Date object to format.
     * @returns A string containing the HTML `<time>` element with the format `<time datetime="YYYY-MM-DD">DD-MMM-YY</time>`.
     */
    public generateTimeElement(date: Date): string {

        const datetime = this.as_YYYY_MM_DD(date);
        const display = this.as_DD_MMM_YY(date);

        return `<time datetime="${datetime}">${display}</time>`;
    }

    /**
     * Generates a `<time>` HTML element representing the current date.
     *
     * @returns The HTML string for a `<time>` element representing the current date with the format `<time datetime="YYYY-MM-DD">DD-MMM-YY</time>`.
     */
    public todayAsTimeElement(): string {
        const today = new Date();
        return this.generateTimeElement(today);
    }
}