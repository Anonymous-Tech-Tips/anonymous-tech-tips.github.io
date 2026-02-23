export interface HistoryRecord {
    date: string;       // Original M/D/YY string from sheet
    year: number;       // Parsed sortable year
    month: number;
    day: number;
    pwcsStatus: string;
    fcpsStatus: string;
    lcpsStatus: string;
    stormNotes: string;
}
const SHEET_URLS = [
    "https://docs.google.com/spreadsheets/d/1VULC1vySGCZNfaU6XuQ4-u5IEsL-s0s2wzWM6TgPZPs/export?format=csv&gid=702572873", // Historic
    "https://docs.google.com/spreadsheets/d/1VULC1vySGCZNfaU6XuQ4-u5IEsL-s0s2wzWM6TgPZPs/export?format=csv&gid=0"         // Current Year
];

export class HistoryService {
    private static cache: HistoryRecord[] | null = null;
    private static fetchPromise: Promise<HistoryRecord[]> | null = null;

    /**
     * Fetches and parses the closure history CSV from Google Sheets.
     * Caches the result so multiple components can request it without spamming the sheet.
     */
    static async getHistory(): Promise<HistoryRecord[]> {
        if (this.cache) return this.cache;
        if (this.fetchPromise) return this.fetchPromise;

        this.fetchPromise = this._fetchAndParse();
        return this.fetchPromise;
    }

    private static async _fetchAndParse(): Promise<HistoryRecord[]> {
        try {
            const records: HistoryRecord[] = [];

            for (const url of SHEET_URLS) {
                const response = await fetch(url);
                if (!response.ok) {
                    console.warn(`Failed to fetch history CSV from ${url}`);
                    continue;
                }

                const rawText = await response.text();
                const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

                let dataStarted = false;

                for (const line of lines) {
                    const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').trim());
                    if (cols.length < 5) continue;

                    const colDate = cols[2];

                    if (colDate && /^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(colDate)) {
                        dataStarted = true;

                        const [m, d, y] = colDate.split('/').map(Number);
                        const fullYear = y < 100 ? 2000 + y : y;

                        // Prevent exact duplicates if overlapping
                        if (!records.some(r => r.year === fullYear && r.month === m && r.day === d)) {
                            records.push({
                                date: colDate,
                                year: fullYear,
                                month: m,
                                day: d,
                                pwcsStatus: cols[3] || "Unknown",
                                fcpsStatus: cols[4] || "Unknown",
                                lcpsStatus: cols[5] || "Unknown",
                                stormNotes: cols[6] || ""
                            });
                        }
                    }
                }
            }

            // Sort newest first
            records.sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                if (a.month !== b.month) return b.month - a.month;
                return b.day - a.day;
            });

            this.cache = records;
            return records;
        } catch (error) {
            console.error("HistoryService error:", error);
            return [];
        } finally {
            this.fetchPromise = null;
        }
    }

    /**
     * Helper to get the official status for a specific district on a specific target date.
     * @param districtId "LCPS", "FCPS", or "PWCS"
     * @param targetDate Date object to check
     * @returns The status string (e.g. "Closed", "Delay") or null if no entry exists.
     */
    static async getOfficialStatus(districtId: string, targetDate: Date): Promise<string | null> {
        const history = await this.getHistory();

        const m = targetDate.getMonth() + 1;
        const d = targetDate.getDate();
        const y = targetDate.getFullYear();

        const record = history.find(r => r.year === y && r.month === m && r.day === d);
        if (!record) return null;

        if (districtId === "LCPS") return record.lcpsStatus;
        if (districtId === "FCPS") return record.fcpsStatus;
        if (districtId === "PWCS") return record.pwcsStatus;

        return null;
    }
}
