import type { RustPanic } from './panic';
import { ErrorArea } from './panic';
export declare function sendPanic(error: RustPanic, cliVersion: string, engineVersion: string): Promise<number>;
export interface CreateErrorReportInput {
    area: ErrorArea;
    binaryVersion: string;
    cliVersion: string;
    command: string;
    jsStackTrace: string;
    kind: ErrorKind;
    liftRequest?: string;
    operatingSystem: string;
    platform: string;
    rustStackTrace: string;
    schemaFile?: string;
    fingerprint?: string;
    sqlDump?: string;
    dbVersion?: string;
}
export declare enum ErrorKind {
    JS_ERROR = "JS_ERROR",
    RUST_PANIC = "RUST_PANIC"
}
export declare function createErrorReport(data: CreateErrorReportInput): Promise<string>;
export declare function makeErrorReportCompleted(signedUrl: string): Promise<number>;
