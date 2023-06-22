export default interface Error {
    code: string,
    reason: string,
    message?: string,
    status?: string,
    referenceError?: string,
    '@baseType'?: string,
    '@schemaLocation'?: string,
    '@type'?: string
}