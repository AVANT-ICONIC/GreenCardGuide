export class SeedValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SeedValidationError';
  }
}

function fail(path: string, message: string): never {
  throw new SeedValidationError(`${path}: ${message}`);
}

export function expectObject(
  value: unknown,
  path: string,
): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(path, 'expected an object');
  }

  return value as Record<string, unknown>;
}

export function expectString(value: unknown, path: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(path, 'expected a non-empty string');
  }

  return value;
}

export function expectOptionalString(
  value: unknown,
  path: string,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return expectString(value, path);
}

export function expectBoolean(value: unknown, path: string): boolean {
  if (typeof value !== 'boolean') {
    fail(path, 'expected a boolean');
  }

  return value;
}

export function expectNumber(value: unknown, path: string): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    fail(path, 'expected a number');
  }

  return value;
}

export function expectStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) {
    fail(path, 'expected an array');
  }

  return value.map((entry, index) => expectString(entry, `${path}[${index}]`));
}

export function expectArray(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) {
    fail(path, 'expected an array');
  }

  return value;
}
