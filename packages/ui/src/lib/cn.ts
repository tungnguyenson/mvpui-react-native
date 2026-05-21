/**
 * Copyright (c) 2026 TungMVP
 * Licensed under MIT
 */

import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
